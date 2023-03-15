export interface PieceInterface {
    x: number;
    y: number;
    shape: number[][];
    color: string;
}

export const PIECES = [
    [[0, 0, 0],
     [1, 1, 1],
     [0, 0, 0]
    ],
    [[2, 0, 0],
     [2, 2, 2],
     [0, 0, 0]
    ],
    [[0, 0, 3],
     [3, 3, 3],
     [0, 0, 0]
    ],
    [[0, 4, 4],
     [0, 4, 4],
     [0, 0, 0]
    ],
    [[0, 0, 0],
     [0, 5, 5],
     [5, 5, 0]
    ],
    [[0, 0, 0],
     [0, 6, 0],
     [6, 6, 6]
    ],
    [[0, 0, 0],
     [7, 7, 0],
     [0, 7, 7]
    ],
];
export const PIECE_COLOR = ['cyan', 'blue', 'orange', 'yellow', 'green', 'purple', 'red', 'white'];
