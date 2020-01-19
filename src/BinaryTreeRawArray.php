<?php

$treeArray =
    [
        'key' => 1,
        'left' => [
            'key' => 2,
            'left' => [
                'key' => 4,
                'left' => [
                    'key' => 8,
                    'left' => [
                        'key' => 15,
                        'left' => [
                            'key' => 23,
                            'left' => null,
                            'right' => null
                        ],
                        'right' => null
                    ],
                    'right' => [
                        'key' => 16,
                        'left' => [
                            'key' => 24,
                            'left' => [
                                'key' => 32,
                                'left' => null,
                                'right' => null
                            ],
                            'right' => null
                        ],
                        'right' => [
                            'key' => 25,
                            'left' => [
                                'key' => 33,
                                'left' => null,
                                'right' => null
                            ],
                            'right' => null
                        ]
                    ]
                ],
                'right' => [
                    'key' => 9,
                    'left' => null,
                    'right' => null
                ]
            ],
            'right' => [
                'key' => 5,
                'left' => [
                    'key' => 10,
                    'left' => [
                        'key' => 17,
                        'left' => null,
                        'right' => null
                    ],
                    'right' => [
                        'key' => 18,
                        'left' => [
                            'key' => 26,
                            'left' => null,
                            'right' => null
                        ],
                        'right' => [
                            'key' => 27,
                            'left' => [
                                'key' => 34,
                                'left' => null,
                                'right' => null
                            ],
                            'right' => null
                        ]
                    ]
                ],
                'right' => [
                    'key' => 11,
                    'left' => null,
                    'right' => null
                ]
            ]
        ],
        'right' => [
            'key' => 3,
            'left' => [
                'key' => 6,
                'left' => null,
                'right' => [
                    'key' => 12,
                    'left' => [
                        'key' => 19,
                        'left' => null,
                        'right' => null
                    ],
                    'right' => [
                        'key' => 20,
                        'left' => [
                            'key' => 28,
                            'left' => null,
                            'right' => null
                        ],
                        'right' => [
                            'key' => 29,
                            'left' => [
                                'key' => 35,
                                'left' => null,
                                'right' => null
                            ],
                            'right' => [
                                'key' => 36,
                                'left' => null,
                                'right' => null
                            ]
                        ]
                    ]
                ]
            ],
            'right' => [
                'key' => 7,
                'left' => [
                    'key' => 13,
                    'left' => null,
                    'right' => null
                ],
                'right' => [
                    'key' => 14,
                    'left' => [
                        'key' => 21,
                        'left' => null,
                        'right' => null
                    ],
                    'right' => [
                        'key' => 22,
                        'left' => [
                            'key' => 30,
                            'left' => null,
                            'right' => null
                        ],
                        'right' => [
                            'key' => 31,
                            'left' => null,
                            'right' => null
                        ]
                    ]
                ]
            ]
        ]
    ];

$newTree = [
    'key' => 'S',
    'left' => [
        'key' => 'A',
        'left' => [
            'key' => 'B',
            'left' => [
                'key' => 'D',
                'left' => [
                    'key' => 'G',
                    'left' => null,
                    'right' => null
                ],
                'right' => null
            ],
            'right' => null
        ],
        'right' => [
            'key' => 'C',
            'left' => [
                'key' => 'D',
                'left' => [
                    'key' => 'G',
                    'left' => null,
                    'right' => null
                ],
                'right' => null
            ],
            'right' => [
                'key' => 'G',
                'left' => null,
                'right' => null
            ]
        ]
    ],
    'right' => [
        'key' => 'G',
        'left' => null,
        'right' => null
    ]
];

function arrayToObject($d)
{
    return is_array($d) ? (object) array_map(__FUNCTION__, $d) : $d;
}

function breathFirstSearch($needle, $rootNode, SplQueue $queue)
{
    echo "On Node " . $rootNode->key . "<br />";
    if ($rootNode->key === $needle) {
        echo "Result found!<br />";
        return;
    }
    if ($rootNode->left) {
        $queue->enqueue($rootNode->left);
    }
    if ($rootNode->right) {
        $queue->enqueue($rootNode->right);
    }
    if (!($queue->isEmpty())) {
        $nextNode = $queue->dequeue();
        breathFirstSearch($needle, $nextNode, $queue);
        return;
    }
    echo "Breath First Search Completed. End of Tree";
}

breathFirstSearch(36, arrayToObject($newTree), new SplQueue);

function depthFirstSearch($needle, $rootNode, SplStack $stack)
{
    echo "On Node " . $rootNode->key . "<br />";
    if ($rootNode->key === $needle) {
        echo "Result found!<br />";
        return;
    }
    if ($rootNode->right) {
        $stack->unshift($rootNode->right);
    }
    $nextNode = $rootNode->left;
    if (!$nextNode) {
        if ($stack->isEmpty()) {
            echo "Depth First Search Completed. End of Tree";
            return;
        }
        $nextNode = $stack->shift();
    }
    depthFirstSearch($needle, $nextNode, $stack);
}

// depthFirstSearch(36, arrayToObject($treeArray), new SplStack);

function bestFirstSearch($needle, $rootNode, SplQueue $queue)
{ }
