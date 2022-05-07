interface ProfileCardProps {
  username: string;
  interests: { interest_name: string }[] | undefined;
}

const ProfileCard = (props: ProfileCardProps) => {
  return (
    <>
      <div>{props.username}</div>
      {!props.interests
        ? null
        : props.interests.map((interest, index) => {
            return <div key={index}>{interest.interest_name}</div>;
          })}
      <button>Add Buddy</button>
      <button>View profile</button>
    </>
  );
};

export default ProfileCard;
