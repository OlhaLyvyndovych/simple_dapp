const forwarderOrigin = 'http://localhost:9010'

//As soon as content in DOM is loaded - initialize function is being called
const initialize = () => {

  //Get the button from the DOM 
  const onboardButton = document.getElementById('connectButton');
  const getAccountsButton = document.getElementById('getAccounts');
  const getAccountsResult = document.getElementById('getAccountsResult');
  const allAccounts = document.getElementById('accounts');

  //Calling the isMetaMaskInstalled function to check if the extention is installed
  const isMetaMaskInstalled = () => {
    //Checking for ethereum binding to the window object 
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  //We create a new MetaMask onboarding object to use in our app
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });

  //This will start the onboarding proccess
  const onClickInstall = () => {
    onboardButton.innerText = 'Onboarding in progress';
    onboardButton.disabled = true;
    //On this object we have startOnboarding which will start the onboarding process for our end user
    onboarding.startOnboarding();
  };

//After calling this function MetaMask will pop up and connect the wallet
  const onClickConnect = async () => {
    try {
      // Will open the MetaMask UI
      // You should disable this button while the request is pending!
      await ethereum.request({ method: 'eth_requestAccounts' });
    } catch (error) {
      console.error(error);
    }
  };


const MetaMaskClientCheck = () => {
  //If not installed - click to install it (text on the button is being changed)
  if (!isMetaMaskInstalled()) {
    onboardButton.innerText = 'Click here to install MetaMask!';
    onboardButton.onclick = onClickInstall;
    //The button is now disabled
    onboardButton.disabled = true;
  } else {
    //If it is installed - text of the button says "Connect"
    onboardButton.innerText = 'Connect';
    //When the button is clicked we call this function to connect the users MetaMask Wallet
    onboardButton.onclick = onClickConnect;
    //The button is now enabled
    onboardButton.disabled = false;
    };
};

  //Eth_Accounts-getAccountsButton
  getAccountsButton.addEventListener('click', async () => {
    //we use eth_accounts because it returns a list of addresses owned by us.
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    //We take the first address in the array of addresses and display it
    getAccountsResult.innerHTML = accounts[0] || 'Not able to get accounts';
    allAccounts.innerHTML = accounts[0];
  });
  MetaMaskClientCheck();
};


window.addEventListener('DOMContentLoaded', initialize)
