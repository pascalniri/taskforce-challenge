import { useState } from 'react';
import TabOne from './TabOne'; // Replace with your actual component paths
import TabTwo from './TabTwo';
import TabThree from './TabThree';
import TabFour from './TabFour';
import useDashboard from './hooks/useDashboard';

const Dashboard = () => {
  const { user } = useDashboard();
  const [activeTab, setActiveTab] = useState('tab1'); // State to track active tab

  return (
    <div className='flex flex-col justify-center items-center mx-auto max-w-7xl font-quicksand px-4 md:px-[30px] lg:px-[5rem] lg:pxx-[30px] xl:px-0 py-[2rem]'>
      <div className='bg-[#5E3BE8] w-full text-white p-[2rem] md:p-[4rem] rounded-[15px]'>
        <h1 className='font-semibold text-[30px] md:text-[40px]'>Hello!, {user?.name}</h1>
        <p className='md:w-[70%]'>Your journey starts here! Explore your personalized dashboard to track, manage, 
        and achieve your goals seamlessly. We&apos;re glad to have you back.</p>
      </div>

      <div className='mt-8 w-full'>
        {/* Tab Navigation */}
        <div className='flex space-x-4 justify-start border-b'>
          <button
            className={`px-4 py-2 ${activeTab === 'tab1' ? 'text-[#5E3BE8] font-bold border-b-2 border-[#5E3BE8]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('tab1')}
          >
            Your expenses
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'tab2' ? 'text-[#5E3BE8] font-bold border-b-2 border-[#5E3BE8]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('tab2')}
          >
            Add new expense
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'tab3' ? 'text-[#5E3BE8] font-bold border-b-2 border-[#5E3BE8]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('tab3')}
          >
            Analytics
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'tab4' ? 'text-[#5E3BE8] font-bold border-b-2 border-[#5E3BE8]' : 'text-gray-500'}`}
            onClick={() => setActiveTab('tab4')}
          >
            Recharge
          </button>
        </div>

        {/* Tab Content */}
        <div className='mt-4'>
          {activeTab === 'tab1' && <TabOne />}
          {activeTab === 'tab2' && <TabTwo />}
          {activeTab === 'tab3' && <TabThree />}
          {activeTab === 'tab4' && <TabFour />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
