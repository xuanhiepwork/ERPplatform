import React from 'react';
import { CheckCircle2, XCircle, Clock, ShieldCheck } from 'lucide-react';
import { cn } from '../../../../components/ui/utils';
import { PaymentRequest, PaymentSignature } from './types';

export function ApprovalStepper({ request }: { request: PaymentRequest }) {
    const stages = [
        { name: 'Accountant', status: request.approvalStage.accountant, signature: request.signatures.accountant },
        { name: 'Chief Accountant', status: request.approvalStage.chiefAccountant, signature: request.signatures.chiefAccountant },
        { name: 'Director', status: request.approvalStage.director, signature: request.signatures.director },
    ];

    const getStageIcon = (status: string, hasSignature: boolean) => {
        if (status === 'approved' && hasSignature) return <CheckCircle2 className="h-5 w-5 text-emerald-600" />;
        if (status === 'rejected') return <XCircle className="h-5 w-5 text-red-600" />;
        return <Clock className="h-5 w-5 text-gray-400" />;
    };

    const getESignatureIcon = (signature?: PaymentSignature) => {
        if (signature) {
            return (
                <div className="relative" title={`E-signed by ${signature.name} on ${signature.date} at ${signature.time}`}>
                    <ShieldCheck className="h-4 w-4 text-emerald-600" />
                    <div className="absolute -top-1 -right-1 h-2 w-2 bg-emerald-500 rounded-full border border-white" />
                </div>
            );
        }
        return null;
    };

    return (
        <div className="flex items-center gap-2">
            {stages.map((stage, index) => (
                <div key={index} className="flex items-center gap-2">
                    <div className={cn(
                        'flex items-center gap-2 px-3 py-1.5 rounded-lg border',
                        stage.status === 'approved' ? 'bg-emerald-50 border-emerald-200' :
                            stage.status === 'rejected' ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
                    )}>
                        {getStageIcon(stage.status, !!stage.signature)}
                        <span className="text-xs font-medium text-gray-700">{stage.name}</span>
                        {getESignatureIcon(stage.signature)}
                    </div>
                    {index < stages.length - 1 && <div className="h-0.5 w-4 bg-gray-300" />}
                </div>
            ))}
        </div>
    );
}