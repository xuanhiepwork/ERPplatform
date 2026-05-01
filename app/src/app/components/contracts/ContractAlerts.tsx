import { AlertTriangle, Building2, User, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { ExpiringContract } from '../../../../mocks/contractMocks';
import { formatCurrency } from './contractUtils';

export function ContractAlerts({ alerts }: { alerts: ExpiringContract[] }) {
    if (!alerts || alerts.length === 0) return null;

    return (
        <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-900">
                    <AlertTriangle className="h-5 w-5" />
                    Expiration Alerts
                </CardTitle>
                <p className="text-sm text-orange-700">
                    {alerts.length} contracts require renewal within 30 days
                </p>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {alerts.map((contract) => (
                        <div key={contract.id} className="flex items-center justify-between p-4 bg-white border border-orange-200 rounded-lg">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h4 className="text-sm">{contract.title}</h4>
                                    <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">{contract.id}</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{contract.partner}</span>
                                    <span className="flex items-center gap-1"><User className="h-3 w-3" />{contract.owner}</span>
                                    <span className="flex items-center gap-1"><DollarSign className="h-3 w-3" />{formatCurrency(contract.value)}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="text-right">
                                    <div className={`text-sm font-medium ${contract.daysRemaining <= 14 ? 'text-red-600' : 'text-orange-600'}`}>
                                        {contract.daysRemaining} days
                                    </div>
                                    <div className="text-xs text-muted-foreground">Expires {contract.expirationDate}</div>
                                </div>
                                <Button size="sm" variant="outline">Renew</Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}