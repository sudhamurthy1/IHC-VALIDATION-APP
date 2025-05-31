import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Save, Plus, Search, Calendar, FileText, Activity, BarChart3, AlertTriangle } from 'lucide-react';

const IHCValidationApp = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [antibodies, setAntibodies] = useState([]);
    const [validations, setValidations] = useState([]);
    const [consumptionLogs, setConsumptionLogs] = useState([]);

    // Initialize with sample data
    useEffect(() => {
        const sampleAntibodies = [
            { id: 1, name: 'CD20', catalog: 'M0755', lot: 'A001', manufacturer: 'DAKO', status: 'Active', expiration: '2025-12-31' },
            { id: 2, name: 'Ki-67', catalog: 'M7240', lot: 'B002', manufacturer: 'DAKO', status: 'Active', expiration: '2026-01-15' },
            { id: 3, name: 'p53', catalog: 'M7001', lot: 'C003', manufacturer: 'DAKO', status: 'Pending', expiration: '2025-11-30' }
        ];
        setAntibodies(sampleAntibodies);
    }, []);

    const Dashboard = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-blue-600">Total Antibodies</p>
                            <p className="text-2xl font-bold text-blue-800">{antibodies.length}</p>
                        </div>
                        <Activity className="h-8 w-8 text-blue-500" />
                    </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-green-600">Active Antibodies</p>
                            <p className="text-2xl font-bold text-green-800">
                                {antibodies.filter(ab => ab.status === 'Active').length}
                            </p>
                        </div>
                        <FileText className="h-8 w-8 text-green-500" />
                    </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-yellow-600">Pending Validation</p>
                            <p className="text-2xl font-bold text-yellow-800">
                                {antibodies.filter(ab => ab.status === 'Pending').length}
                            </p>
                        </div>
                        <AlertTriangle className="h-8 w-8 text-yellow-500" />
                    </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-red-600">Expiring Soon</p>
                            <p className="text-2xl font-bold text-red-800">
                                {antibodies.filter(ab => {
                                    const expDate = new Date(ab.expiration);
                                    const today = new Date();
                                    const daysUntilExp = (expDate - today) / (1000 * 60 * 60 * 24);
                                    return daysUntilExp <= 90;
                                }).length}
                            </p>
                        </div>
                        <Calendar className="h-8 w-8 text-red-500" />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg border">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">CD20 lot A001 validation completed</span>
                        <span className="text-xs text-gray-500 ml-auto">2 hours ago</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">New antibody Ki-67 added to inventory</span>
                        <span className="text-xs text-gray-500 ml-auto">1 day ago</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const LotToLotForm = () => {
        const [formData, setFormData] = useState({
            antibodyName: '',
            manufacturer: '',
            prevLotNumber: '',
            prevExpiration: '',
            prevPerformance: '',
            newLotNumber: '',
            receivedDate: '',
            newExpiration: '',
            prevIntensity: '',
            newIntensity: '',
            prevLocalization: '',
            newLocalization: '',
            prevBackground: '',
            newBackground: '',
            positiveControlTissue: '',
            prevPositiveResults: '',
            newPositiveResults: '',
            concordancePercentage: '',
            negativeControlTissue: '',
            prevNegativeResults: '',
            newNegativeResults: '',
            outcome: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            const newValidation = {
                id: Date.now(),
                type: 'Lot-to-Lot',
                ...formData,
                date: new Date().toISOString().split('T')[0],
                verifiedBy: 'Current User'
            };
            setValidations([...validations, newValidation]);
            alert('Lot-to-Lot verification saved successfully!');
            setFormData({});
        };

        return (
            <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-6">Lot-to-Lot Verification Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Antibody Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={formData.antibodyName || ''}
                                onChange={(e) => setFormData({ ...formData, antibodyName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Manufacturer</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={formData.manufacturer || ''}
                                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Previous Lot Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Previous Lot Number</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.prevLotNumber || ''}
                                    onChange={(e) => setFormData({ ...formData, prevLotNumber: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Expiration Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.prevExpiration || ''}
                                    onChange={(e) => setFormData({ ...formData, prevExpiration: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Performance Rating</label>
                                <select
                                    className="w-full p-2 border rounded-md"
                                    value={formData.prevPerformance || ''}
                                    onChange={(e) => setFormData({ ...formData, prevPerformance: e.target.value })}
                                >
                                    <option value="">Select Rating</option>
                                    <option value="Excellent">Excellent</option>
                                    <option value="Good">Good</option>
                                    <option value="Acceptable">Acceptable</option>
                                    <option value="Poor">Poor</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">New Lot Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">New Lot Number</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.newLotNumber || ''}
                                    onChange={(e) => setFormData({ ...formData, newLotNumber: e.target.value })}
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Received Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.receivedDate || ''}
                                    onChange={(e) => setFormData({ ...formData, receivedDate: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Expiration Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.newExpiration || ''}
                                    onChange={(e) => setFormData({ ...formData, newExpiration: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Comparative Verification Parameters</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Previous Lot Intensity (0-4)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="4"
                                        step="0.5"
                                        className="w-full p-2 border rounded-md"
                                        value={formData.prevIntensity || ''}
                                        onChange={(e) => setFormData({ ...formData, prevIntensity: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">New Lot Intensity (0-4)</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="4"
                                        step="0.5"
                                        className="w-full p-2 border rounded-md"
                                        value={formData.newIntensity || ''}
                                        onChange={(e) => setFormData({ ...formData, newIntensity: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-2">Concordance Percentage</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.concordancePercentage || ''}
                                    onChange={(e) => setFormData({ ...formData, concordancePercentage: e.target.value })}
                                    placeholder="Target: ≥90%"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Verification Outcome</h3>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="outcome"
                                    value="approved"
                                    checked={formData.outcome === 'approved'}
                                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                                    className="mr-2"
                                />
                                Lot Approved for Use
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="outcome"
                                    value="investigation"
                                    checked={formData.outcome === 'investigation'}
                                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                                    className="mr-2"
                                />
                                Lot Requires Further Investigation
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="outcome"
                                    value="rejected"
                                    checked={formData.outcome === 'rejected'}
                                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                                    className="mr-2"
                                />
                                Lot Rejected
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                            onClick={() => setFormData({})}
                        >
                            Clear Form
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Verification
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const NewAntibodyForm = () => {
        const [formData, setFormData] = useState({
            antibodyName: '',
            catalogNumber: '',
            lotNumber: '',
            manufacturer: '',
            recommendedDilution: '',
            recommendedProtocol: '',
            positiveControlTissue1: '',
            positiveControlTissue2: '',
            negativeControlTissue: '',
            optimalDilution: '',
            runsPerformed: '',
            consistencyScore: '',
            outcome: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            const newAntibody = {
                id: Date.now(),
                name: formData.antibodyName,
                catalog: formData.catalogNumber,
                lot: formData.lotNumber,
                manufacturer: formData.manufacturer,
                status: formData.outcome === 'approved' ? 'Active' : 'Pending',
                expiration: '2026-12-31' // Default expiration
            };
            setAntibodies([...antibodies, newAntibody]);

            const newValidation = {
                id: Date.now(),
                type: 'New Antibody',
                ...formData,
                date: new Date().toISOString().split('T')[0],
                validatedBy: 'Current User'
            };
            setValidations([...validations, newValidation]);

            alert('New antibody validation saved successfully!');
            setFormData({});
        };

        return (
            <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-6">New Antibody Validation Form</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Antibody Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={formData.antibodyName || ''}
                                onChange={(e) => setFormData({ ...formData, antibodyName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Catalog Number</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={formData.catalogNumber || ''}
                                onChange={(e) => setFormData({ ...formData, catalogNumber: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">Lot Number</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={formData.lotNumber || ''}
                                onChange={(e) => setFormData({ ...formData, lotNumber: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Vendor Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Manufacturer</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.manufacturer || ''}
                                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Recommended Dilution</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.recommendedDilution || ''}
                                    onChange={(e) => setFormData({ ...formData, recommendedDilution: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Optimal Dilution</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.optimalDilution || ''}
                                    onChange={(e) => setFormData({ ...formData, optimalDilution: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Performance Evaluation</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">Positive Control Tissue 1</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.positiveControlTissue1 || ''}
                                    onChange={(e) => setFormData({ ...formData, positiveControlTissue1: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Positive Control Tissue 2</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.positiveControlTissue2 || ''}
                                    onChange={(e) => setFormData({ ...formData, positiveControlTissue2: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Negative Control Tissue</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.negativeControlTissue || ''}
                                    onChange={(e) => setFormData({ ...formData, negativeControlTissue: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">Consistency Score (0-10)</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="10"
                                    className="w-full p-2 border rounded-md"
                                    value={formData.consistencyScore || ''}
                                    onChange={(e) => setFormData({ ...formData, consistencyScore: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h3 className="text-lg font-medium mb-4">Validation Outcome</h3>
                        <div className="space-y-2">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="outcome"
                                    value="approved"
                                    checked={formData.outcome === 'approved'}
                                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                                    className="mr-2"
                                />
                                Antibody Approved for Routine Use
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="outcome"
                                    value="optimization"
                                    checked={formData.outcome === 'optimization'}
                                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                                    className="mr-2"
                                />
                                Requires Further Optimization
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    name="outcome"
                                    value="unsuitable"
                                    checked={formData.outcome === 'unsuitable'}
                                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                                    className="mr-2"
                                />
                                Not Suitable for Current Application
                            </label>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
                            onClick={() => setFormData({})}
                        >
                            Clear Form
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Validation
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const ConsumptionTracking = () => {
        const [consumptionData, setConsumptionData] = useState({
            date: new Date().toISOString().split('T')[0],
            entries: [{ antibodyName: '', catalogNumber: '', lotNumber: '', initialVolume: '', volumeUsed: '', user: '', purpose: '' }]
        });

        const addEntry = () => {
            setConsumptionData({
                ...consumptionData,
                entries: [...consumptionData.entries, { antibodyName: '', catalogNumber: '', lotNumber: '', initialVolume: '', volumeUsed: '', user: '', purpose: '' }]
            });
        };

        const updateEntry = (index, field, value) => {
            const updatedEntries = consumptionData.entries.map((entry, i) =>
                i === index ? { ...entry, [field]: value } : entry
            );
            setConsumptionData({ ...consumptionData, entries: updatedEntries });
        };

        const removeEntry = (index) => {
            const updatedEntries = consumptionData.entries.filter((_, i) => i !== index);
            setConsumptionData({ ...consumptionData, entries: updatedEntries });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            const newLog = {
                id: Date.now(),
                ...consumptionData,
                loggedBy: 'Current User'
            };
            setConsumptionLogs([...consumptionLogs, newLog]);
            alert('Consumption log saved successfully!');
            setConsumptionData({
                date: new Date().toISOString().split('T')[0],
                entries: [{ antibodyName: '', catalogNumber: '', lotNumber: '', initialVolume: '', volumeUsed: '', user: '', purpose: '' }]
            });
        };

        return (
            <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-6">Daily Antibody Consumption Tracking</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-2">Date</label>
                        <input
                            type="date"
                            className="w-full md:w-auto p-2 border rounded-md"
                            value={consumptionData.date}
                            onChange={(e) => setConsumptionData({ ...consumptionData, date: e.target.value })}
                        />
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="border border-gray-300 p-2 text-left">Antibody Name</th>
                                    <th className="border border-gray-300 p-2 text-left">Catalog #</th>
                                    <th className="border border-gray-300 p-2 text-left">Lot #</th>
                                    <th className="border border-gray-300 p-2 text-left">Initial Volume</th>
                                    <th className="border border-gray-300 p-2 text-left">Volume Used</th>
                                    <th className="border border-gray-300 p-2 text-left">User</th>
                                    <th className="border border-gray-300 p-2 text-left">Purpose</th>
                                    <th className="border border-gray-300 p-2 text-left">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {consumptionData.entries.map((entry, index) => (
                                    <tr key={index}>
                                        <td className="border border-gray-300 p-1">
                                            <input
                                                type="text"
                                                className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                                                value={entry.antibodyName}
                                                onChange={(e) => updateEntry(index, 'antibodyName', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-1">
                                            <input
                                                type="text"
                                                className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                                                value={entry.catalogNumber}
                                                onChange={(e) => updateEntry(index, 'catalogNumber', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-1">
                                            <input
                                                type="text"
                                                className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                                                value={entry.lotNumber}
                                                onChange={(e) => updateEntry(index, 'lotNumber', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-1">
                                            <input
                                                type="text"
                                                className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                                                value={entry.initialVolume}
                                                onChange={(e) => updateEntry(index, 'initialVolume', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-1">
                                            <input
                                                type="text"
                                                className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                                                value={entry.volumeUsed}
                                                onChange={(e) => updateEntry(index, 'volumeUsed', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-1">
                                            <input
                                                type="text"
                                                className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                                                value={entry.user}
                                                onChange={(e) => updateEntry(index, 'user', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-1">
                                            <input
                                                type="text"
                                                className="w-full p-1 border-0 focus:ring-1 focus:ring-blue-500"
                                                value={entry.purpose}
                                                onChange={(e) => updateEntry(index, 'purpose', e.target.value)}
                                            />
                                        </td>
                                        <td className="border border-gray-300 p-1 text-center">
                                            <button
                                                type="button"
                                                onClick={() => removeEntry(index)}
                                                className="text-red-600 hover:text-red-800 text-sm"
                                                disabled={consumptionData.entries.length === 1}
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-between items-center">
                        <button
                            type="button"
                            onClick={addEntry}
                            className="flex items-center px-4 py-2 text-blue-600 border border-blue-300 rounded-md hover:bg-blue-50"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Entry
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Log
                        </button>
                    </div>
                </form>
            </div>
        );
    };

    const AntibodyInventory = () => {
        const [searchTerm, setSearchTerm] = useState('');
        const [filterStatus, setFilterStatus] = useState('all');

        const filteredAntibodies = antibodies.filter(antibody => {
            const matchesSearch = antibody.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                antibody.catalog.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesFilter = filterStatus === 'all' || antibody.status.toLowerCase() === filterStatus;
            return matchesSearch && matchesFilter;
        });

        return (
            <div className="bg-white p-6 rounded-lg border">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Antibody Inventory</h2>
                    <button
                        onClick={() => setActiveTab('new-antibody')}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Antibody
                    </button>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <div className="relative">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search antibodies..."
                                className="w-full pl-10 pr-4 py-2 border rounded-md"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <select
                        className="px-3 py-2 border rounded-md"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="expired">Expired</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="border border-gray-300 p-3 text-left">Antibody Name</th>
                                <th className="border border-gray-300 p-3 text-left">Catalog #</th>
                                <th className="border border-gray-300 p-3 text-left">Lot #</th>
                                <th className="border border-gray-300 p-3 text-left">Manufacturer</th>
                                <th className="border border-gray-300 p-3 text-left">Status</th>
                                <th className="border border-gray-300 p-3 text-left">Expiration</th>
                                <th className="border border-gray-300 p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAntibodies.map((antibody) => (
                                <tr key={antibody.id} className="hover:bg-gray-50">
                                    <td className="border border-gray-300 p-3 font-medium">{antibody.name}</td>
                                    <td className="border border-gray-300 p-3">{antibody.catalog}</td>
                                    <td className="border border-gray-300 p-3">{antibody.lot}</td>
                                    <td className="border border-gray-300 p-3">{antibody.manufacturer}</td>
                                    <td className="border border-gray-300 p-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${antibody.status === 'Active' ? 'bg-green-100 text-green-800' :
                                                antibody.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-red-100 text-red-800'
                                            }`}>
                                            {antibody.status}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 p-3">{antibody.expiration}</td>
                                    <td className="border border-gray-300 p-3">
                                        <button
                                            onClick={() => setActiveTab('lot-to-lot')}
                                            className="text-blue-600 hover:text-blue-800 text-sm mr-3"
                                        >
                                            Verify Lot
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-800 text-sm">
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredAntibodies.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                            No antibodies found matching your criteria.
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const ValidationHistory = () => {
        return (
            <div className="bg-white p-6 rounded-lg border">
                <h2 className="text-xl font-semibold mb-6">Validation History</h2>

                {validations.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        No validation records found. Start by validating an antibody.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {validations.map((validation) => (
                            <div key={validation.id} className="border border-gray-200 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="font-medium text-lg">{validation.antibodyName || 'Unknown Antibody'}</h3>
                                        <p className="text-sm text-gray-600">{validation.type} Validation</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">Date: {validation.date}</p>
                                        <p className="text-sm text-gray-500">
                                            By: {validation.verifiedBy || validation.validatedBy}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium">Manufacturer:</span> {validation.manufacturer || 'N/A'}
                                    </div>
                                    <div>
                                        <span className="font-medium">Lot Number:</span> {validation.newLotNumber || validation.lotNumber || 'N/A'}
                                    </div>
                                    <div>
                                        <span className="font-medium">Outcome:</span>
                                        <span className={`ml-1 px-2 py-1 rounded-full text-xs ${validation.outcome === 'approved' ? 'bg-green-100 text-green-800' :
                                                validation.outcome === 'rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {validation.outcome ? validation.outcome.charAt(0).toUpperCase() + validation.outcome.slice(1) : 'Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard />;
            case 'lot-to-lot':
                return <LotToLotForm />;
            case 'new-antibody':
                return <NewAntibodyForm />;
            case 'consumption':
                return <ConsumptionTracking />;
            case 'inventory':
                return <AntibodyInventory />;
            case 'history':
                return <ValidationHistory />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">IHC Validation System</h1>
                            <p className="text-sm text-gray-600">Immunohistochemistry Antibody Management</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-500">
                                {new Date().toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-6">
                    <div className="lg:w-64">
                        <nav className="bg-white rounded-lg border p-2">
                            <div className="space-y-1">
                                {[
                                    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                                    { id: 'inventory', label: 'Antibody Inventory', icon: FileText },
                                    { id: 'new-antibody', label: 'New Antibody', icon: Plus },
                                    { id: 'lot-to-lot', label: 'Lot-to-Lot Verification', icon: Search },
                                    { id: 'consumption', label: 'Consumption Tracking', icon: Activity },
                                    { id: 'history', label: 'Validation History', icon: Calendar }
                                ].map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => setActiveTab(item.id)}
                                            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === item.id
                                                    ? 'bg-blue-100 text-blue-700 border-blue-200'
                                                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                                }`}
                                        >
                                            <Icon className="mr-3 h-4 w-4" />
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </nav>
                    </div>

                    <div className="flex-1">
                        {renderActiveTab()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IHCValidationApp;
