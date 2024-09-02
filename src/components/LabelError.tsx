const LabelError = ({ name = "field" }: any) => (
  <span className="text-xs capitalize text-red-600 font-medium">
    {name} is required
  </span>
);

export default LabelError;
