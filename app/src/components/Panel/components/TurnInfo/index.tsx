import React from "react";

interface Props {
  isTurn: boolean;
  currentPlayer: string;
  currentWord: string;
}

const TurnInfo: React.FC<Props> = ({ isTurn, currentPlayer, currentWord }) => {
  return (
    <div>
      {isTurn ? (
        <p>Your turn</p>
      ) : (
        <p>{currentPlayer && `Turn of ${currentPlayer}`}</p>
      )}
      {isTurn && <p>{`Word to draw: ${currentWord}`}</p>}
    </div>
  );
};

export { TurnInfo };
