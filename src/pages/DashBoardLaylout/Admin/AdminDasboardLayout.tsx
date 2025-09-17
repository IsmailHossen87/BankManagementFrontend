

export default function AdminDasboardLayout() {
  return (
    <div className="flex-1  p-6">
        <h1 className="text-2xl font-semibold mb-6">CreditFirst - Dashboard</h1>

        {/* Top Cards */}
        <div className="grid grid-cols-1   md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Total Clients</p>
            <h2 className="text-2xl font-bold">10</h2>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Approved Clients</p>
            <h2 className="text-2xl font-bold text-green-600">2</h2>
          </div>
          <div className="bg-white shadow rounded-xl p-4">
            <p className="text-gray-500">Pending Decisions</p>
            <h2 className="text-2xl font-bold text-yellow-500">6</h2>
          </div>
        </div>

        {/* Demo Table */}
        <div className="bg-white shadow shadow-2xl rounded-xl overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">City</th>
                <th className="px-4 py-2">Credit Score</th>
                <th className="px-4 py-2">Amount Requested</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-4 py-2">1</td>
                <td className="px-4 py-2">Los Angeles</td>
                <td className="px-4 py-2 text-green-600">92/100</td>
                <td className="px-4 py-2">$95,000</td>
                <td className="px-4 py-2 text-green-600 font-medium">Approved</td>
              </tr>
              <tr className="border-b">
                <td className="px-4 py-2">2</td>
                <td className="px-4 py-2">Los Angeles</td>
                <td className="px-4 py-2 text-yellow-600">68/100</td>
                <td className="px-4 py-2">$95,000</td>
                <td className="px-4 py-2 text-yellow-600 font-medium">Pending</td>
              </tr>
              <tr>
                <td className="px-4 py-2">3</td>
                <td className="px-4 py-2">Los Angeles</td>
                <td className="px-4 py-2 text-red-600">48/100</td>
                <td className="px-4 py-2">$95,000</td>
                <td className="px-4 py-2 text-red-600 font-medium">Rejected</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  )
}
