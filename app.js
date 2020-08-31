document.addEventListener('DOMContentLoaded', ()=> {
  const grid = document.querySelector('.grid');
  const scoreDisplay = document.getElementById('score');
  const width = 28; // 28 x 28 = 784 carrés
  let score = 0;

  const layout = [
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,3,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,4,4,4,4,4,4,4,4,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,2,2,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    4,4,4,4,4,4,0,0,0,4,1,2,2,2,2,2,2,1,4,0,0,0,4,4,4,4,4,4,
    1,1,1,1,1,1,0,1,1,4,1,2,2,2,2,2,2,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,1,1,1,1,1,0,1,1,4,1,1,1,1,1,1,1,1,4,1,1,0,1,1,1,1,1,1,
    1,0,0,0,0,0,0,0,0,4,4,4,4,4,4,4,4,4,4,0,0,0,0,0,0,0,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,0,1,1,1,1,0,1,1,1,1,1,0,1,1,0,1,1,1,1,1,0,1,1,1,1,0,1,
    1,3,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,3,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,1,1,0,1,1,0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,
    1,0,0,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,1,1,0,0,0,0,0,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,0,1,
    1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,
    1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
  ]

  const squares = [];

  /*légende
  0 - pac-dot
  1 - wall
  2 - ghost-lair
  3 - power-pellet
  4 - empty*/

  //dessiner la grille

  function createBoard() {
    for (let i=0; i < layout.length; i++) {
      const square = document.createElement('div');
      grid.appendChild(square);
      squares.push(square);

      //ajouter la composition du plateau de jeu
      if(layout[i] === 0) {
        squares[i].classList.add('pac-dot')
      } else if(layout[i] === 1) {
        squares[i].classList.add('wall')
      } else if(layout[i] === 2) {
        squares[i].classList.add('ghost-lair')
      }else if(layout[i] === 3) {
        squares[i].classList.add('power-pellet')
      }
    }
  }
  createBoard();

  //ajouter pacman au plateau de jeu
  let pacmanCurrentIndex = 490;

  squares[pacmanCurrentIndex].classList.add('pac-man');

  // faire bouger pacman

  function movePacman(e) {
    squares[pacmanCurrentIndex].classList.remove('pac-man')

    switch(e.keyCode) {
      case 37:
        if(pacmanCurrentIndex % width !== 0 && !squares[pacmanCurrentIndex -1].classList.contains('wall')
          && !squares[pacmanCurrentIndex -1].classList.contains('ghost-lair')) pacmanCurrentIndex -=1;

          // vefification que pacman est au niveau de la sortie de gauche
        if((pacmanCurrentIndex -1) === 363) {
          pacmanCurrentIndex = 391
        }
        break;
      case 38:
        if(pacmanCurrentIndex - width >= 0 && !squares[pacmanCurrentIndex -width].classList.contains('wall')
          && !squares[pacmanCurrentIndex -width].classList.contains('ghost-lair')) pacmanCurrentIndex -=width;
        break;
      case 39:
        if(pacmanCurrentIndex % width < width -1 && !squares[pacmanCurrentIndex +1].classList.contains('wall')
          && !squares[pacmanCurrentIndex +1].classList.contains('ghost-lair')) pacmanCurrentIndex +=1;
        
          // vefification que pacman est au niveau de la sortie de droite
          if((pacmanCurrentIndex +1) === 392) {
            pacmanCurrentIndex = 364
          }
        break;
      case 40:
        if(pacmanCurrentIndex + width < width*width && !squares[pacmanCurrentIndex +width].classList.contains('wall')
        && !squares[pacmanCurrentIndex +width].classList.contains('ghost-lair')) pacmanCurrentIndex +=width;
        break;
    }

    squares[pacmanCurrentIndex].classList.add('pac-man');

    pacDotEaten()
    powerPelletEaten()
    //checkForGameOver()
    //checkForWin()
  }

  document.addEventListener('keyup', movePacman)

  //action quand pacman mange un pac-dot
  function pacDotEaten() {
    if(squares[pacmanCurrentIndex].classList.contains('pac-dot')) {
      score++
      scoreDisplay.innerHTML = score
      squares[pacmanCurrentIndex].classList.remove('pac-dot')
    }
  }

  // quand pacman mange un power-pellet (pilulle de puissance)
  function powerPelletEaten() {
    if(squares[pacmanCurrentIndex].classList.contains('power-pellet')) {
      score +=10
      ghosts.forEach(ghost => ghost.isScared = true)
      setTimeout(unscareGhosts, 10000)
      squares[pacmanCurrentIndex].classList.remove('power-pellet')
    }
  }

  // faire en sorte que le fantome ne soit plus scared
  function unscareGhosts() {
    ghosts.forEach(ghost => ghost.isScared = false)
  }

  //creer un template de fantome
  class Ghost {
    constructor(className, startIndex, speed) {
      this.className = className
      this.startIndex = startIndex
      this.speed = speed
      this.currentIndex = startIndex
      this.timerId = NaN
      this.isScared = false
    }
  }

  ghosts = [
    new Ghost('blinky', 348, 250),
    new Ghost('pinky', 376, 400),
    new Ghost('inky', 351, 300),
    new Ghost('clyde', 379, 500)
  ]

  //dessiner les fantomes sur la grille
  ghosts.forEach(ghost => {
    squares[ghost.currentIndex].classList.add(ghost.className);
    squares[ghost.currentIndex].classList.add('ghost')
  });

  //faire bouger les fantomes de façon aléatoire
  ghosts.forEach(ghost => moveGhost(ghost))

  //fonction pour faire bouger les fantomes
  function moveGhost(ghost) {
    const directions = [-1, +1, width, -width]
    let direction = directions[Math.floor(Math.random() * directions.length)]

    ghost.timerId = setInterval(function() {
      // le fantome peut aller sur un carré si ce n'est pas un mur et s'il n'y a pas deja un autre fantome
      if(!squares[ghost.currentIndex + direction].classList.contains('wall') 
        && !squares[ghost.currentIndex + direction].classList.contains('ghost')) {
          // le fantome peut bouger
          // enlever les classes fantomes
          squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost');
          // changer le currentIndex vers le nouveau carré
          ghost.currentIndex += direction
          // redessiner le fantome sur ce nouveau carré
          squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
          // sinon le fantome cherche une autre direction
        } else direction = directions[Math.floor(Math.random() * directions.length)]

        // pendant que le fantome isScared
        if(ghost.isScared) {
          squares[ghost.currentIndex].classList.add('scared-ghost')
        }

        // // si le fantome isScared et pacman passe dessus, pacman le mange
        // if(ghost.isScared && squares[ghost.currentIndex].classList.contains('pac-man')){
        //   squares[ghost.currentIndex].classList.remove(ghost.className, 'ghost', 'scared-ghost')
        //   ghost.currentIndex = startIndex
        //   score += 100
        //   squares[ghost.currentIndex].classList.add(ghost.className, 'ghost')
        // }


    }, ghost.speed)
  }

})