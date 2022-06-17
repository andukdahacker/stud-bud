interface NewNotiCountProps {
  count: number;
}

const NewNotiCount = ({ count }: NewNotiCountProps) => {
  return (
    <div>
      {count > 0 ? (
        <div className="absolute bottom-0 right-0 flex items-center justify-center w-4 h-4 bg-red-900 rounded-full">
          <span className="text-xs text-white">{count}</span>
        </div>
      ) : null}
    </div>
  );
};

export default NewNotiCount;
