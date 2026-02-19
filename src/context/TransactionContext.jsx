import { createContext, useContext, useEffect, useState } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { useNotifications } from './NotificationContext';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';
import { formatCurrency } from '../utils/formatters';

const TransactionContext = createContext();

export const useTransactions = () => useContext(TransactionContext);

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { currentUser } = useAuth();
    const { addNotification } = useNotifications();

    useEffect(() => {
        if (!currentUser) {
            setTransactions([]);
            setLoading(false);
            return;
        }

        const q = query(
            collection(db, 'transactions'),
            where('uid', '==', currentUser.uid)
        );

        return onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // simple date sort
            setTransactions(docs.sort((a, b) => new Date(b.date) - new Date(a.date)));
            setLoading(false);
        }, (err) => {
            console.error("Fetch error:", err);
            setLoading(false);
        });
    }, [currentUser]);

    const addTransaction = async (data) => {
        if (!currentUser) return;
        try {
            await addDoc(collection(db, 'transactions'), {
                ...data,
                uid: currentUser.uid,
                createdAt: new Date()
            });

            addNotification(
                "Saved!",
                `Added ${formatCurrency(data.amount)} for ${data.description}`,
                'success'
            );
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await deleteDoc(doc(db, 'transactions', id));
            addNotification("Removed", "Transaction deleted.", 'warning');
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const updateTransaction = async (id, data) => {
        try {
            await updateDoc(doc(db, 'transactions', id), data);
            addNotification("Updated", `Saved changes for ${data.description}`, 'info');
        } catch (err) {
            console.error(err);
            throw err;
        }
    };

    const value = {
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        loading
    };

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
};
