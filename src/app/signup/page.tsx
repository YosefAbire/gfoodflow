'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { apiFetch } from '@/lib/apiClient';
import { OrganizationResponse } from '@/types';
import { Sprout, Lock, Mail, User, Building, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

function SignupFormContent() {
  const { register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next') || '/overview';

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationId, setOrganizationId] = useState<string>('');
  const [organizations, setOrganizations] = useState<OrganizationResponse[]>([]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadOrgs() {
      try {
        const orgs = await apiFetch<OrganizationResponse[]>('/organizations', {}, 3000);
        if (Array.isArray(orgs)) {
          setOrganizations(orgs);
        }
      } catch {
        // Optional fallback if no orgs exist
        setOrganizations([]);
      }
    }
    loadOrgs();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await register(email, fullName, password, organizationId || null);
      router.push(nextParam);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Registration failed. Please check your inputs.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-6 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-12 h-12 rounded-xl bg-[#09281C] border border-[#155D3B] flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
            <Sprout className="w-7 h-7 text-[#F7A361]" />
          </div>
        </Link>
        <h1 className="text-2xl font-black text-[#09281C] tracking-tight">Create your Account</h1>
        <p className="text-xs font-semibold text-slate-500">
          Join GamoFoodFlow to access regional agricultural intelligence
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Registration Error</p>
            <p className="text-red-600">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Abebe Bikila"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#155D3B] focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@gfoodflow.org"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#155D3B] focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#155D3B] focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5 text-left">
          <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
            Organization <span className="font-normal text-slate-400 lowercase">(optional)</span>
          </label>
          <div className="relative">
            <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <select
              value={organizationId}
              onChange={(e) => setOrganizationId(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#155D3B] focus:border-transparent transition-all appearance-none cursor-pointer"
            >
              <option value="">No Organization / Independent</option>
              {organizations.map((org) => (
                <option key={org.id} value={org.id}>
                  {org.name} ({org.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 mt-2 bg-[#155D3B] hover:bg-[#09281C] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#155D3B]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#F7A361]" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4 text-[#F7A361] stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500">
        Already registered?{' '}
        <Link href="/login" className="font-bold text-[#155D3B] hover:underline">
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#09281C] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#155D3B]/30 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7C4A21]/30 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <Suspense fallback={
        <div className="w-full max-w-md p-8 bg-white rounded-2xl text-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#155D3B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500">Loading sign up form...</p>
        </div>
      }>
        <SignupFormContent />
      </Suspense>

      <div className="mt-8 text-center text-xs font-medium text-slate-400">
        © 2026 GamoFoodFlow — Agricultural Intelligence Platform
      </div>
    </div>
  );
}
