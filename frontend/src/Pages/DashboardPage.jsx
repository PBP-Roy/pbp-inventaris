import { useState } from "react";
import './DashboardPage.css';

function DashboardPage() {
    return(
        <>
                

                <main className="main-content">

                    <section className="summary">
                        <div className="summary-item">
                            <span>31</span>
                            <p>Number of Suppliers</p>
                        </div>
                        <div className="summary-item">
                            <span>14</span>
                            <p>Number of Categories</p>
                        </div>
                        <div className="summary-item">
                            <span>60</span>
                            <p>Total Product</p>
                        </div>
                    </section>

                    <section className="top-products">
                        <h2>Top 10 Products</h2>
                        <div className="product-grid">
                            {/* Repeat this product card for multiple products */}
                            <div className="product-card">
                                <img src="/path/to/product.jpg" alt="Product" />
                                <p>Es Teh</p>
                                <span>100 packets</span>
                                <span>Rp 430</span>
                            </div>
                        </div>
                    </section>

                    <section className="low-quantity">
                        <h2>Low Quantity Stock</h2>
                        <div className="low-product">
                            <img src="/path/to/product.jpg" alt="Product" />
                            <p>Tata Salt</p>
                            <span>Remaining Quantity: 10</span>
                            <span className="status low">Low</span>
                        </div>
                        {/* Add more low-quantity products */}
                    </section>

                    <section className="chart-section">
                        <h2>Profit & Revenue</h2>
                        <div className="chart">
                            {/* Charting library component can be placed here */}
                            <img src="/path/to/chart-placeholder.png" alt="Chart" />
                        </div>
                    </section>
                </main>
        </>
    )
}

export default DashboardPage;