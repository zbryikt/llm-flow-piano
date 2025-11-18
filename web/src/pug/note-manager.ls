# NoteManager - 音符管理與掉落系統
# 負責載入樂譜、管理音符掉落動畫

note-manager = (root, options = {}) ->
  @ <<<
    root: root
    speed: options.speed or 200  # 像素/秒
    fall-distance: 600  # 音符掉落距離（像素）
    notes: []  # 所有音符資料
    active-notes: []  # 正在掉落的音符
    note-elements: []  # 音符 DOM 元素
    start-time: null
    is-playing: false
    on-note-hit: options.on-note-hit or (->)  # 音符到達判定線回調

  # 計算音符到達判定線需要的時間
  @fall-time = @fall-distance / @speed * 1000  # 毫秒

  @init!
  @

note-manager.prototype = Object.create(Object.prototype) <<<
  constructor: note-manager

  init: ->
    @root.className = 'note-area'

  # 載入樂譜
  load-song: (song-data) ->
    @notes = song-data.notes or []
    @title = song-data.title or 'Untitled'
    @bpm = song-data.bpm or 120

  # 開始播放
  start: ->
    return if @is-playing
    @is-playing = true
    @start-time = Date.now!
    @update!

  # 停止播放
  stop: ->
    @is-playing = false
    @clear-notes!

  # 重置
  reset: ->
    @stop!
    @active-notes = []
    @note-elements = []
    @clear-notes!

  # 清除所有音符元素
  clear-notes: ->
    @root.innerHTML = ""
    @note-elements = []

  # 更新循環（使用 requestAnimationFrame）
  update: ->
    return unless @is-playing

    current-time = Date.now! - @start-time

    # 生成新音符
    @spawn-notes current-time

    # 更新音符位置
    @update-notes current-time

    # 繼續下一幀
    requestAnimationFrame ~> @update!

  # 生成符合條件的音符
  spawn-notes: (current-time) ->
    for note in @notes
      # 計算音符何時應該開始掉落
      # 提前 fall-time 讓音符從頂部落到底部時剛好對準時間
      spawn-time = note.time - @fall-time

      # 檢查是否該生成此音符
      if current-time >= spawn-time and not note.spawned
        @create-note-element note
        note.spawned = true
        @active-notes.push note

  # 建立音符 DOM 元素
  create-note-element: (note) ->
    el = document.createElement 'div'
    el.className = 'note-bar'
    el.dataset.note = note.key

    # 計算音符橫向位置（對應琴鍵）
    key-pos = @get-key-position note.key
    el.style.left = "#{key-pos}px"

    # 計算音符高度（根據 duration）
    height = note.duration / 1000 * @speed
    el.style.height = "#{height}px"

    # 初始位置在頂部
    el.style.top = "0px"

    @root.appendChild el
    @note-elements.push {el: el, note: note}

  # 更新所有音符位置
  update-notes: (current-time) ->
    i = @note-elements.length
    while i--
      item = @note-elements[i]
      note = item.note
      el = item.el

      # 計算音符已經過的時間
      elapsed = current-time - (note.time - @fall-time)

      # 計算當前位置
      y = elapsed / @fall-time * @fall-distance

      # 更新位置
      el.style.top = "#{y}px"

      # 檢查是否到達判定線
      if y >= @fall-distance and not note.hit-checked
        note.hit-checked = true
        @on-note-hit note

      # 移除超出畫面的音符
      if y > @fall-distance + 100
        @root.removeChild el
        @note-elements.splice i, 1

  # 取得琴鍵橫向位置（對應 piano.ls 的 pos）
  get-key-position: (note-key) ->
    key-map =
      'C4': 0, 'C#4': 0.7, 'D4': 1, 'D#4': 1.8
      'E4': 2, 'F4': 3, 'F#4': 3.7, 'G4': 4
      'G#4': 4.75, 'A4': 5, 'A#4': 5.8, 'B4': 6, 'C5': 7

    pos = key-map[note-key] or 0
    pos * 60  # 與琴鍵寬度一致

  # 取得當前時間（毫秒）
  get-current-time: ->
    return 0 unless @start-time
    Date.now! - @start-time

# 跨環境匯出
if window?
  window.NoteManager = note-manager
else
  module.exports = note-manager
