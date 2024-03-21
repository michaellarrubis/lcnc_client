/* eslint-disable import/no-unresolved */
import { useContent } from '@baseHooks/Components/useContent';
import Header from '@baseComponents/Common/Header';
import Sidebar from '@baseComponents/Common/Sidebar';
import PropTypes from 'prop-types';

const MainView = ({ children }) => {
  const { location, isSidebarOpen, setSidebarState } = useContent();
  const isNotScrollable =
    location.pathname === '/my-account' || location.pathname === '/';

  return (
    <div className="flex flex-col h-screen">
      <Header setSidebarState={setSidebarState} />
      <div
        className="flex"
        style={{
          marginTop: location.pathname.includes('v1') ? '35px' : '0'
        }}
      >
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          setSidebarState={setSidebarState}
        />
        <main
          className={`${
            !isNotScrollable ? 'overflow-scroll' : ''
          } mainView relative min-h-fit mt-[60px] p-[14px_18px_39px_30px] w-full ${
            isSidebarOpen ? 'ml-[250px]' : 'ml-[50px]'
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainView;

MainView.propTypes = {
  children: PropTypes.element
};
