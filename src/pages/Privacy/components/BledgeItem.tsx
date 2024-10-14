const PledgeItem: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
  <div className="flex flex-col items-center">
    {icon}
    <p className="text-xl font-semibold text-green-800 body-font">{text}</p>
  </div>
)

export default PledgeItem