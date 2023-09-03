import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import './Layout.styles.scss'
import Logo from '../components/Logo';
// import icons from Material UI
import HomeIcon from '@mui/icons-material/Home';
import SavingsIcon from '@mui/icons-material/Savings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

export const Layout = () => {
  return (
    <>
        <div className="Layout">
            <header className="Layout-header">
                <Logo />
                <nav className="Nav">
                    <div className="Nav-container">
                        <NavLink to="/" className="Nav-link">
                            <HomeIcon />
                            Home
                        </NavLink>
                        <NavLink to="/assets" className="Nav-link">
                            <SavingsIcon />
                            Assets
                        </NavLink>
                        <NavLink to="/debt" className="Nav-link">
                            <AccountBalanceIcon />
                            Debt
                        </NavLink>
                        <NavLink to="/income" className="Nav-link">
                            <MonetizationOnIcon />
                            Income
                        </NavLink>
                        <NavLink to="/expenses" className="Nav-link">
                            <AccountBalanceWalletIcon />
                            Expenses
                        </NavLink>
                    </div>
                </nav>
            </header>
            <main className="Layout-main">
                <Outlet />
            </main>
            <footer className="Layout-footer">
                <span>FlowFi v.0.0.0 @2023 | Built by <a href="https://github.com/shangguanwang" target="_blank" rel="noreferrer">Shangguan Wang</a></span>
            </footer>
        </div>
    </>
  )
}
