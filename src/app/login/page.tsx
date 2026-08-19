'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Sprout, Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';

function LoginFormContent() {
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextParam = searchParams.get('next') || '/overview';

  const [email, setEmail] = useState('admin@gfoodflow.org');
  const [password, setPassword] = useState('AdminPassword123!');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      await login(email, password);
      router.push(nextParam);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Login failed. Please check your credentials.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-200">
      {/* Brand Header */}
      <div className="text-center space-y-2">
        <Link href="/" className="inline-flex items-center gap-2.5 group">
          <div className="w-12 h-12 rounded-xl bg-[#09281C] border border-[#155D3B] flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
            <Sprout className="w-7 h-7 text-[#F7A361]" />
          </div>
        </Link>
        <h1 className="text-2xl font-black text-[#09281C] tracking-tight">Sign In to GamoFoodFlow</h1>
        <p className="text-xs font-semibold text-slate-500">
          Enter your credentials to access the intelligence platform
        </p>
      </div>

      {/* Dev Hint Box */}
      <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl text-left text-[11px] text-emerald-950 space-y-1">
        <div className="font-bold flex items-center justify-between text-[#155D3B]">
          <span>💡 Quick Dev Login Credentials</span>
          <span className="text-[10px] bg-[#155D3B] text-white px-1.5 py-0.5 rounded font-mono">Dev Mode</span>
        </div>
        <p><span className="font-semibold text-slate-600">Email:</span> <code className="bg-white px-1 py-0.5 rounded border border-emerald-200 text-[#09281C] font-mono">admin@gfoodflow.org</code></p>
        <p><span className="font-semibold text-slate-600">Password:</span> <code className="bg-white px-1 py-0.5 rounded border border-emerald-200 text-[#09281C] font-mono">AdminPassword123!</code></p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2.5 animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Authentication Error</p>
            <p className="text-red-600">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
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
          <div className="flex items-center justify-between">
            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
              Password
            </label>
          </div>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#155D3B] focus:border-transparent transition-all"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-[#155D3B] hover:bg-[#09281C] text-white font-extrabold text-xs rounded-xl shadow-lg shadow-[#155D3B]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-[#F7A361]" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4 text-[#F7A361] stroke-[2.5]" />
            </>
          )}
        </button>
      </form>

      {/* Footer Navigation */}
      <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500">
        Don&apos;t have an account yet?{' '}
        <Link href="/signup" className="font-bold text-[#155D3B] hover:underline">
          Create an account
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#09281C] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#155D3B]/30 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#7C4A21]/30 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

      <Suspense fallback={
        <div className="w-full max-w-md p-8 bg-white rounded-2xl text-center space-y-4">
          <div className="w-8 h-8 border-2 border-[#155D3B] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-slate-500">Loading sign in form...</p>
        </div>
      }>
        <LoginFormContent />
      </Suspense>

      <div className="mt-8 text-center text-xs font-medium text-slate-400">
        © 2026 GamoFoodFlow — Agricultural Intelligence Platform
      </div>
    </div>
  );
}
