import React from 'react'

const TableComponent = ({ th, td }) => {


return (
    <div className="flex flex-col">
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                {   th.map(e=> (
                    <th 
                        key={e}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        { e }
                    </th>
                ))  }
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                { td }
            </tbody>
            </table>
        </div>
        </div>
    </div>
    </div>
);
};

export default TableComponent;
