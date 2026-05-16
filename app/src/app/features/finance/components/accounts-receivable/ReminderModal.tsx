import React, { useState, useEffect } from 'react';
import { Bell, Users, Mail, Phone, FileText, AlertTriangle, Send } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/app/components/ui/dialog';
import { Card } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { ARRecord } from './types';
import { formatCurrency } from './utils';

interface ReminderModalProps {
    record: ARRecord;
    isOpen: boolean;
    onClose: () => void;
}

export function ReminderModal({ record, isOpen, onClose }: ReminderModalProps) {
    const [reminderMessage, setReminderMessage] = useState('');

    // Tự động generate tin nhắn mỗi khi cửa sổ mở hoặc truyền record mới vào
    useEffect(() => {
        if (record) {
            setReminderMessage(
                `Dear ${record.contactPerson},\n\nThis is a payment reminder for Invoice ${record.invoiceNumber} in the amount of ${formatCurrency(record.outstandingAmount)}.\n\nThe payment was due on ${record.dueDate} and is currently ${record.daysOverdue} days overdue.\n\nPlease arrange payment at your earliest convenience.\n\nBest regards,\nAccounts Receivable Team`
            );
        }
    }, [record]);

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <Bell className="h-6 w-6 text-red-600" />
                        Send Payment Reminder
                    </DialogTitle>
                    <DialogDescription>
                        {record.partnerName} · Invoice {record.invoiceNumber} · {record.daysOverdue} days overdue
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <Card className="p-4 bg-red-50 border-red-200">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-red-600" />
                                <span className="font-medium">{record.contactPerson}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-red-600" />
                                <span>{record.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4 text-red-600" />
                                <span>{record.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4 text-red-600" />
                                <span>Outstanding: {formatCurrency(record.outstandingAmount)}</span>
                            </div>
                        </div>
                    </Card>

                    {record.reminderCount > 0 && (
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                            <div className="flex items-center gap-2 text-sm text-amber-800">
                                <AlertTriangle className="h-4 w-4" />
                                <span>
                                    {record.reminderCount} reminder{record.reminderCount > 1 ? 's' : ''} sent previously.
                                    Last sent: {record.lastReminder}
                                </span>
                            </div>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Message</label>
                        <textarea
                            value={reminderMessage}
                            onChange={(e) => setReminderMessage(e.target.value)}
                            rows={10}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                    </div>

                    <div className="flex gap-3 pt-4 border-t">
                        <Button className="flex-1 bg-red-600 hover:bg-red-700" onClick={onClose}>
                            <Send className="h-4 w-4 mr-2" /> Send Reminder
                        </Button>
                        <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}