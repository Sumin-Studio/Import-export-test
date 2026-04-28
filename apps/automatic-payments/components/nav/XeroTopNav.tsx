'use client'

import XUIIcon from '@xero/xui/react/icon'
import plusIcon from '@xero/xui-icon/icons/plus'
import searchIcon from '@xero/xui-icon/icons/search'
import starIcon from '@xero/xui-icon/icons/star'
import helpIcon from '@xero/xui-icon/icons/help'
import notificationIcon from '@xero/xui-icon/icons/notification'

export default function XeroTopNav() {
  return (
    <nav className="ap-topnav" aria-label="Main navigation">
      {/* Xero logo */}
      <a href="#" className="ap-topnav__logo" onClick={e => e.preventDefault()} aria-label="Xero">
        <svg width="80" height="40" viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M50.8145 14.2069C48.4972 14.5931 48.111 15.5587 48.111 18.4553L48.111 26.7589C48.111 27.3382 47.5317 27.9175 46.9523 27.9175C46.373 27.9175 45.7937 27.3382 45.7937 26.7589L45.7937 13.2414C45.7937 12.6621 46.1799 12.0828 46.9523 12.0828C47.5317 12.0828 47.9179 12.469 48.111 12.8552C48.8834 12.2759 49.8489 11.8896 50.8145 11.8896L51.2007 11.8896C51.78 11.8896 52.3593 12.469 52.3593 13.0483C52.3593 13.6276 51.9731 14.0138 51.2007 14.2069L50.8145 14.2069ZM26.8692 27.9175C26.483 27.9175 26.2899 27.7244 26.0968 27.5313L20.1105 21.545L13.9311 27.7244C13.738 27.9175 13.5449 28.1106 13.1586 28.1106C12.5793 28.1106 12 27.5313 12 26.952C12 26.5658 12.1931 26.3727 12.3862 26.1796L18.5656 20.0001L12.3862 13.8207C12.1931 13.6276 12 13.2414 12 13.0483C12 12.469 12.5793 11.8896 13.1586 11.8896C13.3517 11.8896 13.738 12.0828 13.9311 12.2759L20.1105 18.4553C20.1105 18.4553 26.2899 12.469 26.2899 12.2759C26.483 12.0828 26.6761 11.8896 27.0623 11.8896C27.6417 11.8896 28.221 12.469 28.221 13.0483C28.221 13.2414 28.0279 13.6276 27.8348 13.8207L21.6553 20.0001L27.8348 26.1796C28.0279 26.3727 28.221 26.5658 28.221 26.952C28.0279 27.3382 27.4485 27.9175 26.8692 27.9175V27.9175ZM59.8905 17.876C58.7319 17.876 57.9594 18.8415 57.9594 19.807C57.9594 20.9657 58.925 21.7381 59.8905 21.7381C61.0491 21.7381 61.8216 20.7726 61.8216 19.807C61.8216 18.8415 60.856 17.876 59.8905 17.876Z" fill="white"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M59.89 11.8896C55.4485 11.8896 51.9726 15.5587 51.9726 20.0001C51.9726 24.4416 55.6416 27.9175 59.89 27.9175C64.3314 27.9175 68.0005 24.2485 68.0005 20.0001C67.8074 15.5587 64.1383 11.8896 59.89 11.8896V11.8896ZM59.89 25.6002C56.8003 25.6002 54.0968 23.0899 54.0968 19.807C54.0968 16.7173 56.6072 14.0138 59.89 14.0138C62.9797 14.0138 65.6832 16.5242 65.6832 19.807C65.4901 23.0899 62.9797 25.6002 59.89 25.6002ZM43.669 18.4553C43.2828 16.138 41.931 14.4 40.1931 13.2414C37.4896 11.5034 33.8206 11.6965 31.3102 13.4345C29.186 14.9794 28.0273 17.4898 28.0273 20.0001C28.0273 20.5795 28.0273 21.3519 28.2205 21.9312C28.9929 25.0209 31.6964 27.5313 34.9792 27.9175C35.9447 28.1106 36.9103 27.9175 37.8758 27.7244C38.6482 27.5313 39.6138 27.1451 40.1931 26.7589C40.9655 26.1796 41.5448 25.6002 42.3173 24.8278C42.7035 24.2485 42.7035 23.4761 42.1242 23.0899C41.7379 22.7036 40.9655 22.7036 40.5793 23.283C40.3862 23.4761 40.3862 23.6692 40.1931 23.8623C39.8069 24.2485 39.2275 24.8278 38.6482 25.214C37.8758 25.6002 36.9103 25.7934 35.9447 25.7934C32.855 25.7934 31.1171 23.4761 30.5377 21.9312C30.3446 21.545 30.3446 21.3519 30.3446 20.9657L30.3446 20.7726L41.7379 20.7726C43.0897 20.7726 44.0552 19.6139 43.669 18.4553V18.4553ZM30.3446 18.6484C30.9239 16.138 33.2412 14.2069 35.9447 14.2069C38.6482 14.2069 40.9655 16.138 41.5448 18.6484L30.3446 18.6484V18.6484Z" fill="white"/>
        </svg>
      </a>

      {/* Org selector */}
      <button className="ap-topnav__org" aria-label="Switch organisation">
        AE Creations
        <svg width="10" height="6" viewBox="0 0 10 6" fill="currentColor" aria-hidden="true">
          <path d="M5 6L0 0h10z"/>
        </svg>
      </button>

      {/* Nav items */}
      <div className="ap-topnav__nav" role="list">
        {['Home', 'Sales', 'Purchases', 'Reporting', 'Accounting', 'Tax', 'Contacts'].map((item) => (
          <a
            key={item}
            href="#"
            role="listitem"
            className={`ap-topnav__navitem${item === 'Sales' ? ' ap-topnav__navitem--active' : ''}`}
            onClick={e => e.preventDefault()}
            aria-current={item === 'Sales' ? 'page' : undefined}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Right-side actions */}
      <div className="ap-topnav__actions">
        <button className="ap-topnav__iconbtn" aria-label="Add new">
          <XUIIcon icon={plusIcon} className="ap-topnav__icon" />
        </button>
        <button className="ap-topnav__iconbtn" aria-label="Search">
          <XUIIcon icon={searchIcon} className="ap-topnav__icon" />
        </button>
        <button className="ap-topnav__iconbtn" aria-label="JAX">
          <XUIIcon icon={starIcon} className="ap-topnav__icon" />
        </button>
        <button className="ap-topnav__iconbtn" aria-label="Help">
          <XUIIcon icon={helpIcon} className="ap-topnav__icon" />
        </button>
        <button className="ap-topnav__iconbtn" aria-label="Notifications">
          <XUIIcon icon={notificationIcon} className="ap-topnav__icon" />
        </button>
        <div className="ap-topnav__avatar" role="button" tabIndex={0} aria-label="Account menu">
          AE
        </div>
      </div>
    </nav>
  )
}
