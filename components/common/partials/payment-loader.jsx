import React from 'react'
import Modal from "~/components/common/modal";

export default function PaymentLoader({ loading = false, message = 'Processing your request' }) {
    return (
        <Modal
            isOpen={loading}
            isCloseIcon={false}
            onRequestClose={() => { }}
            shouldReturnFocusAfterClose={false}
            className="auth-popup bg-img order-message"
            overlayClassName="order d-flex"
        >
            <div className=" text-center mr-auto ml-auto">
                <img
                    src="/images/logo.png"
                    alt="logo"
                    width="100"
                    height="44"
                />
                <div className='w-100 d-flex justify-content-center mt-3'>
                    <div className="d-loading p-unset"></div>
                </div>
                <div className="icon-box d-inline-flex align-items-center mt-3">
                    <div className="icon-box-content">
                        <h5 className=" font-weight-bold lh-1 mb-1">
                            {message}
                        </h5>
                        <p className="lh-1 ls-m mt-2">
                            Please wait
                        </p>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
