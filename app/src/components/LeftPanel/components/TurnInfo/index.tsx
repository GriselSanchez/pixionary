import React, { useContext } from "react";

import { GameContext } from "src/contexts";

const TurnInfo: React.FC = () => {
  const { isTurn, currentPlayer, currentWord } = useContext(GameContext);

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
