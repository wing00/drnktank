class GameState
  isX: true
  playerX: 0
  playerO: 0
  moves: 0
  winner: null
  
  gameField: null
  
  winningNumbers: [7, 56, 448, 73, 146, 292, 273, 84]
  
  constructor: ->
    @gameField = (Math.pow( 2, x ) for x in [0..8])
  
  currentSymbol: ->
    if @isX then 'x' else 'o'
      
  currentPlayer: ->
    if @isX then @playerX else @playerO
      
  checkWinConditions: ->
    for number in @winningNumbers
      if (number & @currentPlayer()) == number
        @winner = "Player #{@currentSymbol().toUpperCase()}"
    if @moves > 8
      @winner = 'Nobody'
  
  updateCurrentSymbol: ->
    @isX = !@isX
  
  updateState: (index) ->
    if @isX
      @playerX += @gameField[index]
    else
      @playerO += @gameField[index]
    @moves++
    @checkWinConditions()
    @updateCurrentSymbol()
    
  reset: ->
    @isX = true
    @playerX = 0
    @playerO = 0
    @moves = 0
    @winner = null

gameState = new GameState

{div, h1} = React.DOM

document.addEventListener 'DOMContentLoaded', ->
  React.renderComponent GameField(), document.body
  
GameField = React.createClass
  getInitialState: ->
    gameIsBeingPlayed: false

  render: ->
    div
      className: 'tic-tac-toe--field'
      children: [
        TicTacToeCellsMatrix
          onClick: @onCellClick
          gameIsBeingPlayed: @state.gameIsBeingPlayed
        EndGamePopOver
          onNewGame: @onNewGame
          gameIsBeingPlayed: @state.gameIsBeingPlayed
      ]

  onNewGame: ->
    gameState.reset()
    @setState gameIsBeingPlayed: true
        
  onCellClick: ->
    if gameState.winner   
      @setState gameIsBeingPlayed: false
 
TicTacToeCell = React.createClass
  getInitialState: ->
    symbol: null
  
  componentWillReceiveProps: ->
      @setState symbol: null if !@props.gameIsBeingPlayed
      
  render: ->
    div
      className: @classes()
      onMouseUp: @clickHandler
      
  classes: ->
    [
      'tic-tac-toe-cell'
      "#{@state.symbol}Symbol" if @state.symbol
    ].join ' '
      
  clickHandler: ->
    if !@state.symbol
      @setState symbol: gameState.currentSymbol()
      gameState.updateState(@props.index)
      @props.onClick()
    
TicTacToeCellsMatrix = React.createClass
  render: ->
    div
      className: 'tic-tac-toe--cells-matrix'
      children: for i in [0..8]
        TicTacToeCell
          index: i
          gameIsBeingPlayed: @props.gameIsBeingPlayed
          onClick: @props.onClick
    
EndGamePopOver = React.createClass 
  render: ->
    div
      className: @classes()
      children: [
        NewGameButton
          onClick: @props.onNewGame
        TitleLabel
          winner: gameState.winner
      ]

  classes: -> [
      'tic-tac-toe--end-game-popover'
      "hidden" if @props.gameIsBeingPlayed
    ].join ' '

TitleLabel = React.createClass
  render: ->
    h1
      className: 'tic-tac-toe--title-label'
      children: "#{@props.winner} wins" if @props.winner

NewGameButton = React.createClass
  render: ->
    div
      className: 'tic-tac-toe--new-game-button'
      children: 'New game'
      onMouseUp: @props.onClick