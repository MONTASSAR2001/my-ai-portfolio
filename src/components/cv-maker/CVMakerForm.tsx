"use client";

import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cvSchema, type CVData } from '@/lib/schemas/cv-schema';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const steps = [
  { id: 1, title: 'Basics' },
  { id: 2, title: 'Experience' },
  { id: 3, title: 'Education' },
  { id: 4, title: 'Skills' },
];

export default function CVMakerForm() {
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm<CVData>({
    resolver: zodResolver(cvSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role: '',
      location: '',
      summary: '',
      skills: [],
      experience: [],
      education: [],
      projects: [],
    },
    mode: 'onTouched',
  });

  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data: CVData) => {
    console.log("Form Submitted:", data);
    // Future PDF Generation or Save logic goes here
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: 'easeIn' } },
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-300 p-6 flex flex-col items-center pt-20">
      <div className="w-full max-w-3xl relative">
        {/* Step Indicator */}
        <div className="flex justify-between items-center mb-12 relative z-10">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col items-center relative z-10">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border transition-all duration-500 ${
                  currentStep >= step.id 
                    ? 'bg-zinc-100 text-black border-zinc-100 shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                    : 'bg-zinc-950 text-zinc-600 border-zinc-800'
                }`}
              >
                {step.id}
              </div>
              <span className={`mt-3 text-xs tracking-widest uppercase transition-colors ${
                currentStep >= step.id ? 'text-zinc-300' : 'text-zinc-600'
              }`}>
                {step.title}
              </span>
            </div>
          ))}
          {/* Progress Line */}
          <div className="absolute top-5 left-0 w-full h-[1px] bg-zinc-900 -z-10">
            <div 
              className="h-full bg-zinc-700 transition-all duration-700 ease-in-out" 
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="bg-zinc-950/50 backdrop-blur-md border border-zinc-800/50 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
            
            {/* Ambient Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[150%] h-32 bg-white/[0.02] blur-[100px] pointer-events-none rounded-full" />

            <div className="min-h-[400px] relative z-10">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div
                    key="step-1"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="mb-8">
                      <h2 className="text-3xl font-light text-white tracking-tight">Basic Information</h2>
                      <p className="text-zinc-500 mt-2 text-sm">Let's start with your professional identity.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Full Name</label>
                        <input 
                          {...register('name')}
                          className="w-full bg-[#09090B] border border-zinc-800 rounded-lg p-3 text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner"
                          placeholder="Jane Doe"
                        />
                        {errors.name && <span className="text-red-500 text-xs">{errors.name.message}</span>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Professional Role</label>
                        <input 
                          {...register('role')}
                          className="w-full bg-[#09090B] border border-zinc-800 rounded-lg p-3 text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner"
                          placeholder="e.g., Senior Next.js Developer"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Email Address</label>
                        <input 
                          {...register('email')}
                          type="email"
                          className="w-full bg-[#09090B] border border-zinc-800 rounded-lg p-3 text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner"
                          placeholder="jane@example.com"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Phone Number</label>
                        <input 
                          {...register('phone')}
                          className="w-full bg-[#09090B] border border-zinc-800 rounded-lg p-3 text-zinc-200 placeholder:text-zinc-700 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 transition-all shadow-inner"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div
                    key="step-2"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center justify-center min-h-[300px] text-center"
                  >
                    <h2 className="text-2xl font-light text-white mb-2">Experience Section</h2>
                    <p className="text-zinc-500">Complex dynamic field arrays will go here.</p>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div
                    key="step-3"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center justify-center min-h-[300px] text-center"
                  >
                    <h2 className="text-2xl font-light text-white mb-2">Education Section</h2>
                    <p className="text-zinc-500">Complex dynamic field arrays will go here.</p>
                  </motion.div>
                )}

                {currentStep === 4 && (
                  <motion.div
                    key="step-4"
                    variants={slideVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center justify-center min-h-[300px] text-center"
                  >
                    <h2 className="text-2xl font-light text-white mb-2">Skills & Summary</h2>
                    <p className="text-zinc-500">Multi-select and large text areas will go here.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Navigation Footer */}
            <div className="mt-10 pt-6 border-t border-zinc-800/50 flex justify-between items-center relative z-10">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center space-x-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  currentStep === 1 
                    ? 'opacity-0 cursor-default' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              {currentStep < steps.length ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex items-center space-x-2 px-6 py-2.5 rounded-lg text-sm font-medium bg-white text-black hover:bg-zinc-200 transition-all active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                >
                  <span>Continue</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-8 py-2.5 rounded-lg text-sm font-medium bg-emerald-500 text-white hover:bg-emerald-400 transition-all active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                >
                  <span>Generate CV</span>
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
