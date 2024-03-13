export const transactionsData = [];

export const FetchTransactionData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...transactionsData]);
    }, 1000);
  });
};

export const AddTransaction = (newTransaction) => {
  transactionsData.push(newTransaction);
};
