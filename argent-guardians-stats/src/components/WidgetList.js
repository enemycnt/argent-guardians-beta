import React from "react";
import { gql, useQuery } from "@apollo/client";
const GUARDIANS_QUERY = gql`
  query getData($where_transaction: Transaction_filter!, $where_guardians: Guardian_filter!) {
    transactions(where: $where_transaction) {
      id
      wallet
      success
      signedHash
    }
    guardianRequests(where: $where_guardians) {
      id
      wallet
      guardian
      executeAfter
    }
  }
`;
const WidgetList = React.memo((props) => {
  const {startTime, endTime} = props;
  const { loading, error, data } = useQuery(GUARDIANS_QUERY, {
    variables: {
      where_transaction: {
        time_gt: startTime,
        time_lt: endTime,
      },
      where_guardians: {
        time_gt: startTime,
        time_lt: endTime,
      },
    },
  });

  if (loading) return <div className="flex justify-center flex-wrap fa-6x text-white"><i class="fas fa-cog fa-spin"></i></div>;
  if (error) return <div className="text-red-600">Error :(</div>;
  const { transactions, guardianRequests } = data;
  return (
    <div className="flex flex-wrap">
      <div className=" w-1/2 p-3 space-y-4">
        <div className="bg-gray-800 border border-gray-700 rounded shadow p-2">
          <div className="flex flex-row items-center">
            <div className="flex-shrink pr-4">
              <div className="rounded p-3 bg-green-600">
                <i className="fa fa-user-friends fa-2x fa-fw fa-inverse"></i>
              </div>
            </div>
            <div className="flex-1 text-right md:text-center">
              <h5 className="font-bold uppercase text-gray-400">
                Guardian requests
              </h5>
              <h3 className="font-bold text-3xl text-gray-600">
                {guardianRequests.length}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className=" w-1/2 p-3 space-y-4">
        <div className="bg-gray-800 border border-gray-700 rounded shadow p-2">
          <div className="flex flex-row items-center">
            <div className="flex-shrink pr-4">
              <div className="rounded p-3 bg-blue-600">
                <i className="fa fa-stream fa-2x fa-fw fa-inverse"></i>
              </div>
            </div>
            <div className="flex-1 text-right md:text-center">
              <h5 className="font-bold uppercase text-gray-400">
                Transactions
              </h5>
              <h3 className="font-bold text-3xl text-gray-600">
                {transactions.length}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default WidgetList;
