function ProgressCard({ icon: Icon, label, numberOfItems, variant }) {
  return (
    <div className="border p-4 rounded-lg flex gap-4 ">
      <div
        className={`p-4  rounded-full ${variant && 'bg-green-200'} ${
          !variant && 'bg-sky-300'
        }`}
      >
        <Icon color={variant ? 'green' : 'blue'} />
      </div>

      <div>
        <h1 className="font-bold ">{label}</h1>
        <p>{numberOfItems}</p>
      </div>
    </div>
  );
}

export default ProgressCard;
