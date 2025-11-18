# Game - 主遊戲控制器
# 整合所有元件，處理判定與計分系統

game = (options = {}) ->
  @ <<<
    piano-root: options.piano-root
    note-root: options.note-root
    score-root: options.score-root
    sound-engine: null
    piano: null
    note-manager: null
    score: 0
    combo: 0
    max-combo: 0
    perfect-count: 0
    good-count: 0
    miss-count: 0
    pending-judgments: []  # 等待判定的音符

  @init!
  @

game.prototype = Object.create(Object.prototype) <<<
  constructor: game

  init: ->
    # 建立音訊引擎
    @sound-engine = new SoundEngine {auto-init: false}

    # 建立鋼琴（綁定按鍵回調）
    @piano = new Piano @piano-root, {
      sound-engine: @sound-engine
      on-key-press: (note) ~> @on-key-press.apply @, [note]
    }

    # 建立音符管理器（綁定音符到達回調）
    @note-manager = new NoteManager @note-root, {
      speed: 200
      on-note-hit: (note) ~> @on-note-hit.apply @, [note]
    }

  # 載入樂譜
  load-song: (song-data) ->
    @note-manager.load-song song-data

  # 開始遊戲
  start: ->
    @reset-score!
    @note-manager.start!
    @update-score-display!

  # 停止遊戲
  stop: ->
    @note-manager.stop!

  # 重置
  reset: ->
    @stop!
    @note-manager.reset!
    @reset-score!

  # 重置分數
  reset-score: ->
    @score = 0
    @combo = 0
    @max-combo = 0
    @perfect-count = 0
    @good-count = 0
    @miss-count = 0
    @pending-judgments = []

  # 當音符到達判定線
  on-note-hit: (note) ->
    # 將音符加入待判定清單
    @pending-judgments.push {
      note: note
      hit-time: @note-manager.get-current-time!
      judged: false
    }

  # 當玩家按下琴鍵
  on-key-press: (pressed-note) ->
    current-time = @note-manager.get-current-time!

    # 尋找最近的未判定音符
    best-match = null
    best-diff = Infinity

    for judgment in @pending-judgments
      continue if judgment.judged
      continue if judgment.note.key != pressed-note

      # 計算時間差
      diff = Math.abs(current-time - judgment.note.time)

      if diff < best-diff
        best-diff = diff
        best-match = judgment

    # 判定結果
    if best-match
      @judge-hit best-match, best-diff
    else
      # 沒有對應音符，不做處理（允許自由彈奏）
      void

  # 判定命中
  judge-hit: (judgment, time-diff) ->
    judgment.judged = true

    # 判定等級
    if time-diff <= 50
      @add-score 'perfect'
      @show-judgment 'PERFECT'
    else if time-diff <= 100
      @add-score 'good'
      @show-judgment 'GOOD'
    else
      @add-score 'miss'
      @show-judgment 'MISS'

  # 加分
  add-score: (type) ->
    switch type
    | 'perfect' =>
      @perfect-count++
      @combo++
      @score += 100 * (1 + @combo * 0.1)
    | 'good' =>
      @good-count++
      @combo++
      @score += 50
    | 'miss' =>
      @miss-count++
      @combo = 0

    @max-combo = Math.max @max-combo, @combo
    @update-score-display!

  # 顯示判定結果
  show-judgment: (text) ->
    return unless @score-root
    judgment-el = document.createElement 'div'
    judgment-el.className = "judgment judgment-#{text.toLowerCase!}"
    judgment-el.textContent = text
    @score-root.appendChild judgment-el

    # 動畫後移除
    setTimeout ->
      judgment-el?.remove!
    , 500

  # 更新分數顯示
  update-score-display: ->
    return unless @score-root
    @score-root.innerHTML = """
      <div class="score-item">Score: #{Math.floor @score}</div>
      <div class="score-item">Combo: #{@combo}</div>
      <div class="score-item">
        <span class="perfect">Perfect: #{@perfect-count}</span> /
        <span class="good">Good: #{@good-count}</span> /
        <span class="miss">Miss: #{@miss-count}</span>
      </div>
    """

# 跨環境匯出
if window?
  window.Game = game
else
  module.exports = game
