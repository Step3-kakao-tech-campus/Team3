import Button from "@/components/atoms/Button";
import { RecordData } from "@/types/recordData";
import MiniProfile from "../MiniProfile";

interface Prop {
  member: RecordData["members"][number];
  isMyRecord: boolean;
  isClose: boolean;
  isStartTimeOver: boolean;
  clientUserId: number;
  scoresLength: number;
  onScoreEditModalOpen: () => void;
  onStarRatingModalOpen: (newTargetId: number) => void;
}

function RecordCardMember({
  member,
  isMyRecord,
  isClose,
  isStartTimeOver,
  clientUserId,
  scoresLength,
  onScoreEditModalOpen,
  onStarRatingModalOpen,
}: Prop): JSX.Element {
  return (
    <div className="member flex gap-4 items-center md:gap-2">
      <MiniProfile userId={member.id} userName={member.name} imageSrc={member.profileImage} />
      {isMyRecord &&
        isClose &&
        isStartTimeOver &&
        clientUserId === member.id &&
        (scoresLength ? (
          <Button size="xs" rounded="full" styleType="outlined-blue" fontWeight="normal" onClick={onScoreEditModalOpen}>
            수정하기
          </Button>
        ) : (
          <Button size="xs" rounded="full" styleType="filled-blue" fontWeight="normal" onClick={onScoreEditModalOpen}>
            점수등록
          </Button>
        ))}
      {isMyRecord &&
        isClose &&
        isStartTimeOver &&
        clientUserId !== member.id &&
        (member.isRated ? (
          <Button size="xs" rounded="full" styleType="outlined-gray" fontWeight="normal">
            완료
          </Button>
        ) : (
          <Button
            size="xs"
            rounded="full"
            styleType="outlined-orange"
            fontWeight="normal"
            onClick={() => onStarRatingModalOpen(member.id)}
          >
            별점주기
          </Button>
        ))}
    </div>
  );
}

export default RecordCardMember;
