
import { ChevronDownIcon } from '@heroicons/react/24/outline';



// --- Componentes Auxiliares ---
export const FieldGroup = ({ label, children, className = '', error }: { label: string, children: React.ReactNode, className?: string, error?: string }) => (
    <div className={`flex flex-col ${className}`}>
        <label className="text-xs font-bold uppercase text-black mb-1">
            {label}
        </label>
        <div>{children}</div>
        {error && <span className="text-red-500 text-xs mt-1">({error})</span>}
    </div>
);

export const StyledSelect = ({ name, value, onChange, onBlur, children, disabled = false }: { name: string, value: string, onChange: (e: React.ChangeEvent<any>) => void, onBlur: (e: React.FocusEvent<any>) => void, children: React.ReactNode, disabled?: boolean }) => (
    <div className="relative">
        <select
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className="appearance-none border border-gray-300 rounded-sm p-2 w-full text-sm bg-white cursor-pointer focus:ring-[#199431] focus:border-[#ADC708] pr-8 disabled:bg-gray-100 disabled:cursor-not-allowed"
        >
            {children}
        </select>
        <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
    </div>
);




