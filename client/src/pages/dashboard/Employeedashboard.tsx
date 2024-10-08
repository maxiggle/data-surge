import Button from "../../components/UI/Button";
import DataTable from "../../components/UI/DataTable";
import { FaPlus } from "react-icons/fa";
import Model from "../../components/UI/Modal";
import { useState } from "react";
import ReviewContract from "../../components/Modals/ReviewContract";

export default function Contract() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-lg font-semibold">Contract</h2>
        <div>
          <Button onClick={() => setShow(true)} variant="primary">
            Review Contract
          </Button>
        </div>
      </div>

      <div className="mt-8">
        <DataTable
          label={"Loan Transactions"}
          left={
            <div>
              <Button
                variant="primary"
                className="!py-2 flex flex-row gap-1 items-center"
              >
                <FaPlus className="mr-2" />
                Take a loan
              </Button>{" "}
            </div>
          }
          data={[
            {
              sn: 1,
              date: new Date().toLocaleDateString(),
              amount: 10000,
              status: "Paid",
            },
          ]}
          headers={["SN", "Date", "Amount", "Status"]}
        />
      </div>

      <Model state={show} size="3xl" setState={setShow}>
        <ReviewContract />
      </Model>
    </div>
  );
}
