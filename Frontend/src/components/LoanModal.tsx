import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  User, 
  Bike, 
  Send, 
  Loader2, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { 
  submitLoanApplication, 
  getVehicleMakes, 
  getVehicleModels, 
  VehicleOption,
  LoanApplicationPayload 
} from '../services/api';
import { useBodyScrollLock } from '../hooks/useBodyScrollLock';

interface LoanModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoanModal: React.FC<LoanModalProps> = ({ isOpen, onClose }) => {
  useBodyScrollLock(isOpen);

  const [formData, setFormData] = useState({
    name: '',
    nic: '',
    mobile: '',
    city: '',
    make: '',
    makename: '',
    model: '',
    modelname: '',
    condition: '',
    regyear: '',
    bikeno: ''
  });

  const [makesList, setMakesList] = useState<VehicleOption[]>([]);
  const [modelsList, setModelsList] = useState<VehicleOption[]>([]);
  const [isLoadingMakes, setIsLoadingMakes] = useState(false);
  const [isLoadingModels, setIsLoadingModels] = useState(false);

  const [formErrors, setFormErrors] = useState<Record<string, boolean>>({});
  const [showWarningModal, setShowWarningModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load makes from database when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsLoadingMakes(true);
      getVehicleMakes()
        .then(data => {
          setMakesList(data || []);
        })
        .catch(err => {
          console.error('Failed to load vehicle makes from database:', err);
          setMakesList([]);
        })
        .finally(() => {
          setIsLoadingMakes(false);
        });
    }
  }, [isOpen]);

  // Load models from database when make changes
  useEffect(() => {
    if (formData.make) {
      setModelsList([]);
      setIsLoadingModels(true);
      getVehicleModels(formData.make)
        .then(models => {
          setModelsList(models || []);
        })
        .catch(err => {
          console.error('Failed to load vehicle models from database:', err);
          setModelsList([]);
        })
        .finally(() => {
          setIsLoadingModels(false);
        });
    } else {
      setModelsList([]);
    }
  }, [formData.make]);

  if (!isOpen) return null;

  // Format mobile number: XX XXX XXXX (Sri Lanka standard format)
  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    let limitedDigits = rawDigits;
    if (limitedDigits.length > 9) {
      limitedDigits = limitedDigits.substring(0, 9);
    }

    let formatted = limitedDigits;
    if (limitedDigits.length > 5) {
      formatted = `${limitedDigits.substring(0, 2)} ${limitedDigits.substring(2, 5)} ${limitedDigits.substring(5)}`;
    } else if (limitedDigits.length > 2) {
      formatted = `${limitedDigits.substring(0, 2)} ${limitedDigits.substring(2)}`;
    }

    setFormData(prev => ({ ...prev, mobile: formatted }));
    if (formErrors.mobile) {
      setFormErrors(prev => ({ ...prev, mobile: false }));
    }
  };

  // Auto-capitalize 'V' for old NIC and limit length to 10 or 12
  const handleNicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.toUpperCase();
    if (/^\d{9}[V]/.test(val)) {
      val = val.substring(0, 10);
    } else if (val.length > 12) {
      val = val.substring(0, 12);
    }
    setFormData(prev => ({ ...prev, nic: val }));
    if (formErrors.nic) {
      setFormErrors(prev => ({ ...prev, nic: false }));
    }
  };

  const handleMakeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const makeVal = e.target.value;
    const selectedOption = makesList.find(m => m.value === makeVal);
    setFormData(prev => ({
      ...prev,
      make: makeVal,
      makename: selectedOption ? selectedOption.text : makeVal,
      model: '',
      modelname: ''
    }));
    if (formErrors.make) {
      setFormErrors(prev => ({ ...prev, make: false }));
    }
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelVal = e.target.value;
    const selectedOption = modelsList.find(m => m.value === modelVal);
    setFormData(prev => ({
      ...prev,
      model: modelVal,
      modelname: selectedOption ? selectedOption.text : modelVal
    }));
    if (formErrors.model) {
      setFormErrors(prev => ({ ...prev, model: false }));
    }
  };

  const handleConditionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const condVal = e.target.value;
    setFormData(prev => ({
      ...prev,
      condition: condVal,
      regyear: condVal === 'Second Hand' ? prev.regyear : ''
    }));
    if (formErrors.condition) {
      setFormErrors(prev => ({ ...prev, condition: false }));
    }
    if (condVal !== 'Second Hand' && formErrors.regyear) {
      setFormErrors(prev => ({ ...prev, regyear: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors: Record<string, boolean> = {};

    if (!formData.name.trim()) errors.name = true;

    // NIC: 9 digits + V/v or 12 digits
    const nicVal = formData.nic.trim();
    const nicOldFormat = /^\d{9}[Vv]$/;
    const nicNewFormat = /^\d{12}$/;
    if (!nicOldFormat.test(nicVal) && !nicNewFormat.test(nicVal)) {
      errors.nic = true;
    }

    // Contact number: 9 digits
    const mobileDigits = formData.mobile.replace(/\s/g, '');
    if (mobileDigits.length !== 9) {
      errors.mobile = true;
    }

    if (!formData.city.trim()) errors.city = true;
    if (!formData.make) errors.make = true;
    if (!formData.model) errors.model = true;
    if (!formData.condition) errors.condition = true;

    if (formData.condition === 'Second Hand' && !formData.regyear) {
      errors.regyear = true;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setShowWarningModal(true);
      return;
    }

    setFormErrors({});
    setShowWarningModal(false);
    setIsSubmitting(true);

    try {
      const regNo = formData.bikeno.trim();
      let vehicleIdentifier = '';
      if (formData.condition === 'Brand New') {
        vehicleIdentifier = regNo ? `${regNo} (Brand New)` : 'Brand New';
      } else if (formData.condition === 'Second Hand') {
        if (regNo) {
          vehicleIdentifier = `${regNo} (Year: ${formData.regyear})`;
        } else {
          vehicleIdentifier = `Second Hand (Year: ${formData.regyear})`;
        }
      } else {
        vehicleIdentifier = regNo;
        if (formData.regyear) {
          vehicleIdentifier = vehicleIdentifier ? `${vehicleIdentifier} (Year: ${formData.regyear})` : `Year: ${formData.regyear}`;
        }
      }

      const phoneNumber = mobileDigits.startsWith('0') ? mobileDigits : `0${mobileDigits}`;

      const payload: LoanApplicationPayload = {
        name: formData.name.trim(),
        nic: formData.nic.trim().toUpperCase(),
        mobile: phoneNumber,
        city: formData.city.trim(),
        brand: formData.make,
        brandname: formData.makename || formData.make,
        model: formData.model,
        modelname: formData.modelname || formData.model,
        vehicleno: vehicleIdentifier,
        loanamount: 0,
        noof: 0
      };

      await submitLoanApplication(payload);
      setShowSuccessModal(true);
    } catch (err) {
      console.error('Submission failed:', err);
      setShowSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormAndClose = () => {
    setShowSuccessModal(false);
    setShowWarningModal(false);
    setFormData({
      name: '',
      nic: '',
      mobile: '',
      city: '',
      make: '',
      makename: '',
      model: '',
      modelname: '',
      condition: '',
      regyear: '',
      bikeno: ''
    });
    setFormErrors({});
    onClose();
  };

  // Generate eligible registration years (current year down to 2015)
  const currentYear = new Date().getFullYear();
  const regYears: number[] = [];
  for (let y = currentYear; y >= 2015; y--) {
    regYears.push(y);
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      {/* Background click dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog */}
      <div 
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden z-10 animate-modal-pop border border-slate-100 flex flex-col max-h-[90vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#003d8f] text-white px-6 py-4 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-white" />
            <h3 className="text-xl font-bold tracking-tight text-white m-0">
              Request a Loan
            </h3>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="text-white hover:text-slate-200 text-2xl font-bold leading-none p-1 transition-colors cursor-pointer"
            aria-label="Close"
          >
            &times;
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto overscroll-contain space-y-4">
          <form id="loanForm" onSubmit={handleSubmit} noValidate>
            
            {/* Card 1: Applicant Details */}
            <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-xl shadow-xs mb-3">
              <div className="border-l-4 border-[#003d8f] pl-3 mb-4 flex items-center">
                <h5 className="text-slate-900 text-base font-bold m-0 flex items-center">
                  <User className="w-4 h-4 mr-2 text-slate-800" />
                  Applicant Details
                </h5>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name With Initials */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Name With Initials <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, name: e.target.value }));
                      if (formErrors.name) setFormErrors(prev => ({ ...prev, name: false }));
                    }}
                    placeholder="E.g. J.A. Ranasinghe"
                    className={`w-full h-10 px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-800 transition-all outline-none ${
                      formErrors.name 
                        ? 'border-red-500 ring-2 ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f]/20'
                    }`}
                  />
                </div>

                {/* NIC Number */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    NIC Number <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nic}
                    onChange={handleNicChange}
                    placeholder="950000000V or 199500000000"
                    className={`w-full h-10 px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-800 transition-all outline-none ${
                      formErrors.nic 
                        ? 'border-red-500 ring-2 ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f]/20'
                    }`}
                  />
                  <div className="text-xs text-slate-500 mt-1">
                    Old format: 9 digits + V &nbsp;|&nbsp; New format: 12 digits
                  </div>
                </div>

                {/* Contact Number with Sri Lanka Flag Badge */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Contact Number <span className="text-red-600 font-bold">*</span>
                  </label>
                  <div className={`flex items-center rounded-lg border bg-white overflow-hidden transition-all h-10 ${
                    formErrors.mobile 
                      ? 'border-red-500 ring-2 ring-red-500/20' 
                      : 'border-slate-200 focus-within:border-[#003d8f] focus-within:ring-2 focus-within:ring-[#003d8f]/20'
                  }`}>
                    {/* Sri Lanka Flag Badge */}
                    <div className="flex items-center gap-1.5 px-3 bg-slate-50 border-r border-slate-200 h-full text-xs font-semibold text-slate-700 shrink-0 select-none">
                      {/* Detailed crisp Sri Lanka Flag SVG */}
                      <svg className="w-5 h-3.5 rounded-xs shadow-xs border border-amber-300" viewBox="0 0 24 16">
                        <rect width="24" height="16" fill="#f7b718"/>
                        <rect x="2" y="2" width="4" height="12" fill="#005f38"/>
                        <rect x="6" y="2" width="4" height="12" fill="#eb7400"/>
                        <rect x="11" y="2" width="11" height="12" fill="#8d153a"/>
                        <circle cx="16.5" cy="8" r="3" fill="#f7b718"/>
                        <path d="M12 3 L12.5 3.5 L12 4 Z M21 3 L20.5 3.5 L21 4 Z M12 13 L12.5 12.5 L12 12 Z M21 13 L20.5 12.5 L21 12 Z" fill="#f7b718"/>
                      </svg>
                      <span>+94</span>
                      <span className="text-[10px] text-slate-400 ml-0.5">▾</span>
                    </div>
                    <input
                      type="text"
                      value={formData.mobile}
                      onChange={handleMobileChange}
                      placeholder="77 XXX XXXX"
                      className="w-full h-full px-3 text-sm text-slate-800 bg-transparent outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Personal Address / City */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Personal Address / City <span className="text-red-600 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={e => {
                      setFormData(prev => ({ ...prev, city: e.target.value }));
                      if (formErrors.city) setFormErrors(prev => ({ ...prev, city: false }));
                    }}
                    placeholder="E.g. Ambalangoda"
                    className={`w-full h-10 px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-800 transition-all outline-none ${
                      formErrors.city 
                        ? 'border-red-500 ring-2 ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f]/20'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Vehicle Requirements */}
            <div className="bg-white border border-slate-200 p-4 sm:p-5 rounded-xl shadow-xs">
              <div className="border-l-4 border-[#003d8f] pl-3 mb-4 flex items-center">
                <h5 className="text-slate-900 text-base font-bold m-0 flex items-center">
                  <Bike className="w-4 h-4 mr-2 text-slate-800" />
                  Vehicle Requirements
                </h5>
              </div>

              {/* Row 1: Preferred Make & Model */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {/* Preferred Make */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Preferred Make <span className="text-red-600 font-bold">*</span>
                  </label>
                  <select
                    value={formData.make}
                    onChange={handleMakeChange}
                    disabled={isLoadingMakes}
                    className={`w-full h-10 px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-800 transition-all outline-none cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed ${
                      formErrors.make 
                        ? 'border-red-500 ring-2 ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f]/20'
                    }`}
                  >
                    <option value="">{isLoadingMakes ? 'Loading makes...' : '--Select--'}</option>
                    {makesList.map(m => (
                      <option key={m.value} value={m.value}>
                        {m.text}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred Model */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Preferred Model <span className="text-red-600 font-bold">*</span>
                  </label>
                  <select
                    value={formData.model}
                    onChange={handleModelChange}
                    disabled={!formData.make || isLoadingModels}
                    className={`w-full h-10 px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-800 transition-all outline-none cursor-pointer disabled:bg-slate-100 disabled:cursor-not-allowed ${
                      formErrors.model 
                        ? 'border-red-500 ring-2 ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f]/20'
                    }`}
                  >
                    <option value="">
                      {!formData.make 
                        ? '--Select Make First--' 
                        : isLoadingModels 
                          ? 'Loading models...' 
                          : '--Select--'}
                    </option>
                    {modelsList.map(mod => (
                      <option key={mod.value} value={mod.value}>
                        {mod.text}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 2: Condition & Registration Year */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                {/* Vehicle Condition */}
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Vehicle Condition <span className="text-red-600 font-bold">*</span>
                  </label>
                  <select
                    value={formData.condition}
                    onChange={handleConditionChange}
                    className={`w-full h-10 px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-800 transition-all outline-none cursor-pointer ${
                      formErrors.condition 
                        ? 'border-red-500 ring-2 ring-red-500/20' 
                        : 'border-slate-200 focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f]/20'
                    }`}
                  >
                    <option value="">--Select Condition--</option>
                    <option value="Brand New">Brand New</option>
                    <option value="Second Hand">Second Hand</option>
                  </select>
                </div>

                {/* Registration Year (Visible only when condition === 'Second Hand') */}
                {formData.condition === 'Second Hand' ? (
                  <div className="animate-fade-in">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                      Registration Year <span className="text-red-600 font-bold">*</span>
                    </label>
                    <select
                      value={formData.regyear}
                      onChange={e => {
                        setFormData(prev => ({ ...prev, regyear: e.target.value }));
                        if (formErrors.regyear) setFormErrors(prev => ({ ...prev, regyear: false }));
                      }}
                      className={`w-full h-10 px-3.5 py-2 text-sm rounded-lg border bg-white text-slate-800 transition-all outline-none cursor-pointer ${
                        formErrors.regyear 
                          ? 'border-red-500 ring-2 ring-red-500/20' 
                          : 'border-slate-200 focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f]/20'
                      }`}
                    >
                      <option value="">--Select Year--</option>
                      {regYears.map(year => (
                        <option key={year} value={year.toString()}>
                          {year}
                        </option>
                      ))}
                    </select>
                    <div className="text-xs text-slate-500 mt-1">
                      Only vehicles from 2015 onwards are eligible.
                    </div>
                  </div>
                ) : (
                  <div className="hidden md:block" />
                )}
              </div>

              {/* Row 3: Registration Number (Optional) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-1.5">
                    Registration Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.bikeno}
                    onChange={e => setFormData(prev => ({ ...prev, bikeno: e.target.value }))}
                    placeholder="E.g. CP BFD-XXXX"
                    className="w-full h-10 px-3.5 py-2 text-sm rounded-lg border border-slate-200 bg-white text-slate-800 transition-all outline-none focus:border-[#003d8f] focus:ring-2 focus:ring-[#003d8f]/20"
                  />
                  <div className="text-xs text-slate-500 mt-1">
                    Leave blank if unregistered.
                  </div>
                </div>
                <div className="hidden md:block" />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-3 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-48 h-11 bg-[#003d8f] hover:bg-[#002d6b] text-white font-semibold text-sm rounded-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit Request
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-48 h-11 bg-transparent hover:bg-slate-50 text-slate-600 hover:text-slate-800 border-2 border-slate-200 hover:border-slate-300 font-semibold text-sm rounded-lg transition-all flex items-center justify-center uppercase tracking-wide cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* ===== SWEETALERT-STYLE ATTENTION / WARNING POPUP ===== */}
      {showWarningModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 animate-modal-pop">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 border border-amber-200 mx-auto flex items-center justify-center mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-slate-900 mb-2">
              Attention!
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Please enter the correct information in the boxes marked in red.
            </p>
            <button
              type="button"
              onClick={() => setShowWarningModal(false)}
              className="w-full py-2.5 px-6 bg-[#003d8f] hover:bg-[#002d6b] text-white font-bold rounded-lg transition-all cursor-pointer shadow-md"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ===== SWEETALERT-STYLE SUCCESS POPUP ===== */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 text-center shadow-2xl border border-slate-100 animate-modal-pop">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-extrabold text-emerald-700 mb-2">
              Successful!
            </h4>
            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              Your application has been successfully submitted. We will contact you soon!
            </p>
            <button
              type="button"
              onClick={resetFormAndClose}
              className="w-full py-2.5 px-6 bg-[#003d8f] hover:bg-[#002d6b] text-white font-bold rounded-lg transition-all cursor-pointer shadow-md"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
