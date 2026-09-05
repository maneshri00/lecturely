import React, { useEffect, useRef, useState } from 'react';
import { loadGoogleScript, parseJwt, GOOGLE_CLIENT_ID } from '../utils/googleAuth';
import { toast } from 'react-hot-toast';

interface GoogleSignInButtonProps {
  onSuccess: (email: string, fullName: string, idToken?: string) => void;
  text?: string;
  role?: string;
}

export const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({
  onSuccess,
  text = 'Continue with Google',
  role = 'STUDENT',
}) => {
  const btnRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    loadGoogleScript()
      .then(() => {
        if (!isMounted) return;
        setScriptLoaded(true);

        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: GOOGLE_CLIENT_ID,
            callback: (response: any) => {
              if (response.credential) {
                const decoded = parseJwt(response.credential);
                const email = decoded.email || 'user@gmail.com';
                const fullName = decoded.name || email.split('@')[0];
                onSuccess(email, fullName, response.credential);
              }
            },
            auto_select: false,
          });

          // Render native Google SDK button if container ref is available
          if (btnRef.current) {
            btnRef.current.innerHTML = '';
            window.google.accounts.id.renderButton(btnRef.current, {
              theme: 'outline',
              size: 'large',
              width: 320,
              text: 'continue_with',
              shape: 'rectangular',
              logo_alignment: 'left',
            });
          }
        }
      })
      .catch((err) => {
        console.warn('Google GSI Load warning:', err);
      });

    return () => {
      isMounted = false;
    };
  }, [onSuccess]);

  const handleManualClick = () => {
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      setLoading(true);
      loadGoogleScript().then(() => {
        setLoading(false);
        if (window.google?.accounts?.id) {
          window.google.accounts.id.prompt();
        }
      });
    }
  };

  return (
    <div className="w-full">
      {/* Official Native Google SDK Render Container */}
      <div ref={btnRef} className="w-full min-h-[44px] flex justify-center mb-2 overflow-hidden rounded-xl" />

      {/* Fallback Custom Google Trigger */}
      {(!scriptLoaded || !btnRef.current?.children.length) && (
        <button
          type="button"
          onClick={handleManualClick}
          disabled={loading}
          className="w-full py-3.5 px-4 bg-[#090e18] hover:bg-[#0a2540] border border-[#0a2540] hover:border-[#b58153]/60 rounded-xl text-white font-bold text-sm transition-all duration-200 flex items-center justify-center gap-3 shadow-md hover:shadow-ns-gold group"
        >
          <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.15C3.26 21.3 7.35 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.61H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.39l3.99-3.15z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.35 0 3.26 2.7 1.29 6.61l3.99 3.15c.95-2.85 3.6-4.96 6.72-4.96z"
            />
          </svg>
          <span>{loading ? 'Connecting to Google...' : text}</span>
        </button>
      )}
    </div>
  );
};
