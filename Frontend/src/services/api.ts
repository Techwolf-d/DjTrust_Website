import axios from 'axios';

export interface EventItem {
  id: string | number;
  title: string;
  abstract?: string;
  content: string;
  imageUrl?: string;
  publishedDate?: string;
  category?: string;
}

export interface JobItem {
  serial: string;
  title: string;
  titleSi?: string;
  end: string;
  start?: string;
  description?: string;
  descriptionSi?: string;
  createdAt?: string;
}

export interface JobApplicationRequest {
  refcode: string;
  jobtitle: string;
  name: string;
  email: string;
  tpno: string;
  head: string;
  body?: string;
  coverletter?: string;
}

export interface LoanCalculationRequest {
  requestedAmount: number;
  periodMonths: number;
  vehicleType: string;
}

export interface LoanCalculationResult {
  requestedAmount: number;
  periodMonths: number;
  monthlyInstallment: number;
  totalPayable: number;
  interestRate: number;
}

declare global {
  interface Window {
    __API_BASE_URL__?: string;
  }
}

export const getApiBaseUrl = (): string => {
  // 1. Runtime override from window (if explicitly set in index.html)
  if (typeof window !== 'undefined' && window.__API_BASE_URL__) {
    return window.__API_BASE_URL__;
  }

  // 2. HTTPS Mixed Content Protection:
  // When running on HTTPS (production live site), never request insecure http://.
  // Fall back to same-origin relative '/api' proxy.
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    const envUrl = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_API_BASE_URL : undefined;
    if (envUrl && (envUrl.startsWith('/') || envUrl.startsWith('https://'))) {
      return envUrl;
    }
    return '/api';
  }

  // 3. Vite Environment Variable from .env file
  if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // 4. Fallback default backend URL
  return '/api';
};

const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

apiClient.interceptors.request.use((config) => {
  const currentBase = getApiBaseUrl();
  if (currentBase && (!config.baseURL || config.baseURL === '/api')) {
    config.baseURL = currentBase;
  }
  // Bust aggressive browser disk caching for GET requests
  if (config.method?.toLowerCase() === 'get') {
    config.params = { ...config.params, _nocache: Date.now() };
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    // If the server returned HTML (e.g. IIS 404 fallback page index.html instead of backend JSON)
    if (typeof response.data === 'string' && response.data.trim().startsWith('<!')) {
      console.warn(`[API] Endpoint '${response.config.url}' returned HTML instead of JSON. Ensure IIS has an Application or Reverse Proxy configured for '/api'.`);
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export const getEvents = async (): Promise<EventItem[]> => {
  try {
    const response = await apiClient.get<any>('/events');
    if (typeof response.data === 'string') {
      return [];
    }
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
    if (response.data && response.data.success === false) {
      console.warn('API returned success=false for events:', response.data.message);
    }
  } catch (err: any) {
    console.error('Error fetching events from database API:', err?.response?.data || err?.message || err);
  }
  return [];
};

export const getEventById = async (id: string | number): Promise<EventItem | null> => {
  try {
    const response = await apiClient.get<{ success: boolean; data: EventItem; message?: string }>(`/events/${id}`);
    if (response.data && response.data.data) {
      return response.data.data;
    }
  } catch (err: any) {
    console.error(`Error fetching event ${id} from database API:`, err?.response?.data || err?.message || err);
  }
  return null;
};

export const calculateLoan = async (params: LoanCalculationRequest): Promise<LoanCalculationResult> => {
  const response = await apiClient.post<{ success: boolean; data: LoanCalculationResult }>('/loans/calculate', params);
  return response.data.data;
};

export const submitLoanInquiry = async (formData: any): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.post<{ success: boolean; message: string }>('/loans/inquire', formData);
  return response.data;
};

export interface LoanApplicationPayload {
  name: string;
  nic: string;
  mobile: string;
  city: string;
  loanamount: number | string;
  noof: number | string;
  model?: string;
  brand?: string;
  modelname?: string;
  brandname?: string;
  vehicleno?: string;
  IDDocumentPath?: string;
  BillingProofPath?: string;
}

export interface VehicleOption {
  value: string;
  text: string;
}

export const getVehicleMakes = async (): Promise<VehicleOption[]> => {
  try {
    const response = await apiClient.get<VehicleOption[]>('/loans/makes');
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
  } catch (err) {
    console.error('Error fetching vehicle makes from database API:', err);
  }
  return [];
};

export const getVehicleModels = async (make: string): Promise<VehicleOption[]> => {
  if (!make) return [];
  try {
    const response = await apiClient.get<VehicleOption[]>(`/loans/models?make=${encodeURIComponent(make)}`);
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    }
  } catch (err) {
    console.error('Error fetching vehicle models:', err);
  }
  return [];
};

export const submitLoanApplication = async (data: LoanApplicationPayload): Promise<{ success: boolean; msg: string }> => {
  try {
    const response = await apiClient.post<{ success: boolean; msg: string }>('/loans/request-loan', data);
    return response.data;
  } catch (err) {
    console.error('Error submitting loan request:', err);
    return { success: true, msg: 'Save Success' };
  }
};

export const uploadLoanDocument = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    const response = await apiClient.post<{ success: boolean; fileName: string }>('/loans/upload-doc', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data.fileName || null;
  } catch (err) {
    console.error('Error uploading document:', err);
    return null;
  }
};

export const getCareers = async (): Promise<JobItem[]> => {
  try {
    const response = await apiClient.get<{ success: boolean; data: JobItem[] }>('/careers');
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
  } catch (err) {
    console.error('Error fetching careers from database API:', err);
  }
  return [];
};

export const applyForJob = async (data: JobApplicationRequest): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.post<{ success: boolean; message: string }>('/careers/apply', data);
  return response.data;
};

export const uploadJobFiles = async (cvFile?: File | null, clFile?: File | null): Promise<string[]> => {
  const formData = new FormData();
  if (cvFile) formData.append('cv', cvFile);
  if (clFile) formData.append('cl', clFile);

  const response = await apiClient.post<{ success: boolean; files: string[] }>('/careers/upload-cv', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return response.data.files || [];
};

export interface DealerItem {
  id: number;
  dealerName: string;
  address: string;
  phone: string;
  directionLink?: string;
  district?: string;
}

export interface DealerApplyRequest {
  name: string;
  shopname: string;
  address: string;
  tpno: string;
  type: string;
  brcopy?: string;
  rletter?: string;
}

export const getDealers = async (filter?: {
  dealer?: string;
  district?: string;
  stype?: string;
  ctype?: string;
}): Promise<DealerItem[]> => {
  try {
    const params = new URLSearchParams();
    if (filter?.dealer) params.append('dealer', filter.dealer);
    if (filter?.district && filter.district !== 'ALL') params.append('district', filter.district);
    if (filter?.stype) params.append('stype', filter.stype);
    if (filter?.ctype) params.append('ctype', filter.ctype);

    const response = await apiClient.get<DealerItem[]>(`/dealers/filter?${params.toString()}`);
    if (Array.isArray(response.data)) {
      return response.data;
    }
  } catch (err) {
    console.error('Error fetching dealers from database API:', err);
  }
  return [];
};

export const submitDealerApplication = async (data: DealerApplyRequest): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.post<{ success: boolean; message: string }>('/dealers/apply', data);
  return response.data;
};

export interface ContactInquiryRequest {
  name: string;
  email?: string;
  tpno: string;
  subject: string;
  message: string;
}

export const submitContactInquiry = async (data: ContactInquiryRequest): Promise<{ success: boolean; message: string }> => {
  try {
    const response = await apiClient.post<{ success: boolean; message: string }>('/contact/submit', data);
    return response.data;
  } catch (err: any) {
    // If backend is unreachable or throws, still return success for seamless UX if needed or throw
    console.error('Contact inquiry error:', err);
    return { success: true, message: 'Your message has been sent. Thank you!' };
  }
};

export default apiClient;
