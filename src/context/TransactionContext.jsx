import { createContext, useContext, useEffect, useState } from 'react';
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    updateDoc,
    onSnapshot,
    query,
    where,
    orderBy
} from 'firebase/firestore';
import { useNotifications } from './NotificationContext';
import { db } from '../firebase/config';
import { useAuth } from './AuthContext';

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

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Sort in memory to avoid needing a composite index
            const sortedDocs = docs.sort((a, b) => new Date(b.date) - new Date(a.date));

            setTransactions(sortedDocs);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching transactions: ", error);
            setTransactions([]);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    const addTransaction = async (transaction) => {
        if (!currentUser) return;
        try {
            await addDoc(collection(db, 'transactions'), {
                ...transaction,
                uid: currentUser.uid,
                createdAt: new Date()
            });
            addNotification(
                "Transaction Recorded",
                `Successfully saved ₹${parseFloat(transaction.amount).toLocaleString('en-IN')} for ${transaction.description}`,
                'success'
            );
        } catch (error) {
            console.error("Error adding transaction: ", error);
            throw error;
        }
    };

    const deleteTransaction = async (id) => {
        try {
            await deleteDoc(doc(db, 'transactions', id));
            addNotification(
                "Transaction Removed",
                "Successfully deleted the transaction record.",
                'warning'
            );
        } catch (error) {
            console.error("Error deleting transaction: ", error);
            throw error;
        }
    };

    const updateTransaction = async (id, updatedTransaction) => {
        try {
            await updateDoc(doc(db, 'transactions', id), updatedTransaction);
            addNotification(
                "Transaction Updated",
                `Successfully updated details for ${updatedTransaction.description}`,
                'info'
            );
        } catch (error) {
            console.error("Error updating transaction: ", error);
            throw error;
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
