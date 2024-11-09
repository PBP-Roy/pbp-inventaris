import { useState } from "react";
import './DashboardPage.css';

function DashboardPage() {
    return(
        <>
            <div className="dashboard-content">
                <div className="product-summary">
                    <p id="title-subtable">Product Summary</p>
                    <div className="summary-container">
                        <div className="summary-item">
                            <div className="icon-summary"><img src="/src/assets/categories.jpg" alt="" id="icon-summary-item" /></div>
                            <div className="quantity-summary">14</div>
                            <div className="title-summary"></div>
                            Total Categories
                        </div>
                        <div className="vertical-divider"></div>
                        <div className="summary-item">
                            <div className="icon-summary"><img src="/src/assets/total-product.jpg" alt="" id="icon-summary-item" /></div>
                            <div className="quantity-summary">199</div>
                            <div className="title-summary"></div>
                            Total Products
                        </div>
                        <div className="vertical-divider"></div>
                        <div className="summary-item">
                            <div className="icon-summary"><img src="/src/assets/product-in.jpg" alt="" id="icon-summary-item" /></div>
                            <div className="quantity-summary">180</div>
                            <div className="title-summary"></div>
                            Total Product-in
                        </div>
                        <div className="vertical-divider"></div>
                        <div className="summary-item">
                            <div className="icon-summary"><img src="/src/assets/product-out.jpg" alt="" id="icon-summary-item" /></div>
                            <div className="quantity-summary">14</div>
                            <div className="title-summary"></div>
                            Total Product-out
                        </div>
                        <div className="vertical-divider"></div>
                        <div className="summary-item">
                            <div className="icon-summary"><img src="/src/assets/broken-product.jpg" alt="" id="icon-summary-item" /></div>
                            <div className="quantity-summary">4</div>
                            <div className="title-summary"></div>
                            Total Broken Product
                        </div>
                    </div>
                </div>
                <div className="low-stock">
                    <p id="title-subtable">Low Quantity Stock</p>
                    <div className="ls-product-container">
                        <div className="ls-product">
                            <div className="ls-image"><img src="/src/assets/lays.jpg" alt="" id="img-ls" /></div>
                            <div className="ls-content">
                                <div className="ls-name">Lays</div>
                                <div className="ls-quantity">Remaining Quantity : 10 Packet</div>
                            </div>
                        </div>
                        <div className="ls-product">
                            <div className="ls-image"><img src="/src/assets/lays.jpg" alt="" id="img-ls"/></div>
                            <div className="ls-content">
                                <div className="ls-name">Lays</div>
                                <div className="ls-quantity">Remaining Quantity : 15 Packet</div>
                            </div>
                        </div>
                        <div className="ls-product">
                            <div className="ls-image"><img src="/src/assets/lays.jpg" alt="" id="img-ls"/></div>
                            <div className="ls-content">
                                <div className="ls-name">Lays</div>
                                <div className="ls-quantity">Remaining Quantity : 18 Packet</div>
                            </div>
                        </div>
                        <div className="ls-product">
                            <div className="ls-image"><img src="/src/assets/lays.jpg" alt="" id="img-ls"/></div>
                            <div className="ls-content">
                                <div className="ls-name">Lays</div>
                                <div className="ls-quantity">Remaining Quantity : 19 Packet</div>
                            </div>
                        </div>
                        <div className="ls-product">
                            <div className="ls-image"><img src="/src/assets/lays.jpg" alt="" id="img-ls"/></div>
                            <div className="ls-content">
                                <div className="ls-name">Lays</div>
                                <div className="ls-quantity">Remaining Quantity : 20 Packet</div>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div className="top-product">
                    <p id="title-subtable">Top 10 Product</p>
                    <div className="card-grid">
                        <div className="card-product">
                            <div className="card-image"><img src="/src/assets/logo.jpg" alt="" /></div>
                            <div className="card-content">
                                <div className="card-title">product</div>   
                                <div className="card-category">category</div>
                            </div>
                            <div className="card-quantity">100 packets</div>
                        </div>
                        <div className="card-product">
                            <div className="card-image"><img src="/src/assets/logo.jpg" alt="" /></div>
                            <div className="card-content">
                                <div className="card-title">product</div>
                                <div className="card-category">category</div>
                            </div>
                            <div className="card-quantity">100 packets</div>
                        </div>
                        <div className="card-product">
                            <div className="card-image"><img src="/src/assets/logo.jpg" alt="" /></div>
                            <div className="card-content">
                                <div className="card-title">product</div>
                                <div className="card-category">category</div>
                            </div>
                            <div className="card-quantity">100 packets</div>
                        </div>
                        <div className="card-product">
                            <div className="card-image"><img src="/src/assets/logo.jpg" alt="" /></div>
                            <div className="card-content">
                                <div className="card-title">product</div>
                                <div className="card-category">category</div>
                            </div>
                            <div className="card-quantity">100 packets</div>
                        </div>
                        <div className="card-product">
                            <div className="card-image"><img src="/src/assets/logo.jpg" alt="" /></div>
                            <div className="card-content">
                                <div className="card-title">product</div>
                                <div className="card-category">category</div>
                            </div>
                            <div className="card-quantity">100 packets</div>
                        </div>
                        <div className="card-product">
                            <div className="card-image"><img src="/src/assets/logo.jpg" alt="" /></div>
                            <div className="card-content">
                                <div className="card-title">product</div>
                                <div className="card-category">category</div>
                            </div>
                            <div className="card-quantity">100 packets</div>
                        </div>
                        <div className="card-product">
                            <div className="card-image"><img src="/src/assets/logo.jpg" alt="" /></div>
                            <div className="card-content">
                                <div className="card-title">product</div>
                                <div className="card-category">category</div>
                            </div>
                            <div className="card-quantity">100 packets</div>
                        </div>
                        <div className="card-product">
                            <div className="card-image"><img src="/src/assets/logo.jpg" alt="" /></div>
                            <div className="card-content">
                                <div className="card-title">product</div>
                                <div className="card-category">category</div>
                            </div>
                            <div className="card-quantity">100 packets</div>
                        </div>
                        <div className="card-product">
                            <div className="card-image"><img src="/src/assets/logo.jpg" alt="" /></div>
                            <div className="card-content">
                                <div className="card-title">product</div>
                                <div className="card-category">category</div>
                            </div>
                            <div className="card-quantity">100 packets</div>
                        </div>
                        <div className="card-product">
                            <div className="card-image"><img src="/src/assets/logo.jpg" alt="" /></div>
                            <div className="card-content">
                                <div className="card-title">product</div>
                                <div className="card-category">category</div>
                            </div>
                            <div className="card-quantity">100 packets</div>
                        </div>
                    </div>
                </div>
                <div className="report-visualization">
                    <p id="title-subtable">Report Visualization</p>
                </div>
            </div>
                {/* <main className="main-content">

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
                        
                    </section>

                    <section className="chart-section">
                        <h2>Profit & Revenue</h2>
                        <div className="chart">
        
                            <img src="/path/to/chart-placeholder.png" alt="Chart" />
                        </div>
                    </section>
                </main> */}
        </>
    )
}

export default DashboardPage;