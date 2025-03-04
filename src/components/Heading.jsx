const Heading = ({ title }) => {
  return (
    <div className="wrapper grid grid-cols-[1fr,4fr,1fr] sm:grid-cols-[1fr,1fr,1fr] items-center gap-4">
      <div className="h-[1px] w-full bg-white rounded-full"></div>
      <h3 className="text3 font-semibold uppercase text-center">{title}</h3>
      <div className="h-[1px] w-full bg-white rounded-full"></div>
    </div>
  );
};

export default Heading;
