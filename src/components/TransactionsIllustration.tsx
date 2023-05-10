import { Card } from "antd";

export const TransactionIllustration = ({
  transactions,
}: {
  transactions: any[];
}) => {
  return (
    <Card>
      {transactions.map((trx) => (
        <div key={trx.hash}>
          <div>Submit time: {new Date(trx.trxStart).toISOString()}</div>
          <div>Hash: {trx.hash}</div>
        </div>
      ))}
    </Card>
  );
};
