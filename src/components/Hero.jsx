import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const Hero = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [transaction, setTransaction] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [totalSpent, setTotalSpent] = useState(0);
    const [showQuote, setShowQuote] = useState(false);
    const [smsSent, setSmsSent] = useState(false); // ✅ To prevent multiple SMS

    const handleAddTransaction = () => {
        const amount = parseFloat(transaction);
        if (isNaN(amount) || amount <= 0) return;
        const newTotalSpent = totalSpent + parseFloat(transaction);
        const transactionTime = new Date().toLocaleTimeString();

        setTotalSpent(newTotalSpent);
        setTransactions([...transactions, { amount: parseFloat(transaction), time: transactionTime }]);
        setTransaction(0);

        if (newTotalSpent > totalAmount) {
            setShowQuote(true);

            // ✅ Trigger SMS only once
            if (!smsSent) {
                fetch('http://localhost:5000/send-sms', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.success) {
                            console.log('✅ SMS sent successfully!');
                            setSmsSent(true);
                        } else {
                            console.error('❌ SMS failed:', data.error);
                        }
                    })
                    .catch(err => console.error('💥 Error sending SMS:', err));
                setSmsSent(false);
            }
        } else {
            setShowQuote(false);
            setSmsSent(false); // ✅ Reset if user reduces budget use
        }
    };

    const chartData = {
        labels: transactions.map((t) => t.time),
        datasets: [
            {
                label: 'Transaction Amount',
                data: transactions.map((t) => t.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
            },
        ],
    };

    const chartOptions = {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Amount',
                },
                beginAtZero: true,
            },
        },
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-row items-center justify-center p-4 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold text-center mb-6 text-indigo-600">Budget Tracker</h1>

                {/* Total Budget Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Total Amount:</label>
                    <input
                        type="number"
                        value={totalAmount}
                        onChange={(e) => setTotalAmount(parseFloat(e.target.value))}
                        placeholder="Enter total amount"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                {/* Transaction Input */}
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Transaction:</label>
                    <input
                        type="number"
                        value={transaction}
                        onChange={(e) => setTransaction(parseFloat(e.target.value))}
                        placeholder="Enter transaction amount"
                        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                </div>

                <button
                    onClick={handleAddTransaction}
                    className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
                >
                    Add Transaction
                </button>

                {/* Transactions List */}
                <div className="mt-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">Transactions:</h2>
                    <ul className="space-y-2">
                        {transactions.map((trans, index) => (
                            <li key={index} className="bg-gray-100 p-2 rounded-lg">
                                Transaction {index + 1}: ${trans.amount} at {trans.time}
                            </li>
                        ))}
                    </ul>
                    <h3 className="mt-4 text-lg font-semibold text-gray-800">Total Spent: ${totalSpent}</h3>
                </div>

                {/* Budget Limit Exceeded Warning */}
                {totalSpent > totalAmount && (
                    <div className="mt-4 text-red-600 font-semibold">
                        <h3>Your limit exceeds!</h3>
                    </div>
                )}
            </div>

            {/* Chart Section */}
            <div className="mt-8 w-full max-w-xl bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-indigo-600 mb-6 text-center">Transaction History</h2>
                <Line data={chartData} options={chartOptions} />
            </div>

            {/* Motivational Quote Popup */}
            {showQuote && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <h2 className="text-xl font-bold mb-4 text-indigo-600">Keep Your Budget in Check!</h2>
                        <p className="text-gray-700 mb-6">"The art is not in making money, but in keeping it."</p>
                        <button
                            onClick={() => setShowQuote(false)}
                            className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-300"
                        >
                            Got It!
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
