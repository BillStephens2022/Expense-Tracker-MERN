import React from "react";

export default function TransactionTable() {
  return (
    <div>
      <h1 id="transaction-table-header">Your Transactions</h1>

      <div>
        <table class="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Essential?</th>
              <th scope="col">Category</th>
              <th scope="col">Amount</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">2/1/23</th>
              <td>Y</td>
              <td>Housing</td>
              <td>2,345.56</td>
              <td>Monthly Mortgage Payment</td>
            </tr>
            <tr>
              <th scope="row">2/2/23</th>
              <td>N</td>
              <td>Cable/Subscription Services</td>
              <td>19.99</td>
              <td>Monthly Netflix Description</td>
            </tr>
            <tr>
              <th scope="row">2/3/23</th>
              <td>Y</td>
              <td>Groceries</td>
              <td>145.78</td>
              <td>Grocery Shopping</td>
            </tr>
            <tr>
              <th scope="row">2/4/23</th>
              <td>Y</td>
              <td>Insurance</td>
              <td>312.93</td>
              <td>Geico Auto Insurance</td>
            </tr>
            <tr>
              <th scope="row">2/5/23</th>
              <td>N</td>
              <td>Entertainment</td>
              <td>345.78</td>
              <td>Concert Tickets</td>
            </tr>
            <tr>
              <th scope="row">2/7/23</th>
              <td>N</td>
              <td>Vacation</td>
              <td>2,416.15</td>
              <td>Trip to Cancun</td>
            </tr>
            <tr>
              <th scope="row">2/8/23</th>
              <td>Y</td>
              <td>Utilities</td>
              <td>175.00</td>
              <td>Monthly PG&E gas/electric</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
