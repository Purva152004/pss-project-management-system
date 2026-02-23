const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <h2 className="text-gray-500">{title}</h2>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </div>
  );
};

export default DashboardCard;