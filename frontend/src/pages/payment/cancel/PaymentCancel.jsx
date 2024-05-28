import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './paymentcancel.module.css';

export default function PaymentCancel() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        window.location.href = '/';
    };

    return (
        <div className={styles["payment-cancel-container"]}>
            <h2>Оплата скасована</h2>
            <p className={styles["payment-cancel-message"]}>Ваша оплата була скасована. Якщо це сталося помилково, будь ласка, спробуйте ще раз.</p>
            <button className={styles["payment-button"]} onClick={handleGoBack}>
                Повернутися на головну
            </button>
        </div>
    );
}
