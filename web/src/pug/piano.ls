# Piano - 鋼琴琴鍵視覺元件與輸入處理
# 負責渲染琴鍵、處理鍵盤/滑鼠/觸控輸入

piano = (root, options = {}) ->
  @ <<<
    root: root
    sound-engine: options.sound-engine or new SoundEngine!
    on-key-press: options.on-key-press or (->)  # 按鍵回調

  # 琴鍵配置
  @ <<<
    keys: [
      {note: 'C4', key: 'A', type: 'white', pos: 0}
      {note: 'C#4', key: 'W', type: 'black', pos: 0.7}
      {note: 'D4', key: 'S', type: 'white', pos: 1}
      {note: 'D#4', key: 'E', type: 'black', pos: 1.8}
      {note: 'E4', key: 'D', type: 'white', pos: 2}
      {note: 'F4', key: 'F', type: 'white', pos: 3}
      {note: 'F#4', key: 'T', type: 'black', pos: 3.7}
      {note: 'G4', key: 'G', type: 'white', pos: 4}
      {note: 'G#4', key: 'Y', type: 'black', pos: 4.75}
      {note: 'A4', key: 'H', type: 'white', pos: 5}
      {note: 'A#4', key: 'U', type: 'black', pos: 5.8}
      {note: 'B4', key: 'J', type: 'white', pos: 6}
      {note: 'C5', key: 'K', type: 'white', pos: 7}
    ]
    key-map: {}  # 鍵盤映射表 {鍵碼: note}
    active-keys: {}  # 追蹤按住的按鍵

  # 建立鍵盤映射
  for key-info in @keys
    @key-map[key-info.key] = key-info.note

  @init!
  @

piano.prototype = Object.create(Object.prototype) <<<
  constructor: piano

  init: ->
    @render!
    @setup-events!

  # 渲染鋼琴琴鍵
  render: ->
    @root.innerHTML = ""
    @root.className = 'piano-container'

    # 建立琴鍵元素
    for key-info in @keys
      key-el = document.createElement 'div'
      key-el.className = "piano-key piano-key-#{key-info.type}"
      key-el.dataset.note = key-info.note
      key-el.dataset.key = key-info.key
      key-el.style.left = "#{key-info.pos * 60}px"

      # 顯示鍵盤提示
      label = document.createElement 'span'
      label.className = 'key-label'
      label.textContent = key-info.key
      key-el.appendChild label

      @root.appendChild key-el

  # 設定事件監聽
  setup-events: ->
    # 鍵盤事件
    document.addEventListener 'keydown', (e) ~> @on-keydown.apply @, [e]
    document.addEventListener 'keyup', (e) ~> @on-keyup.apply @, [e]

    # 滑鼠/觸控事件
    keys = @root.querySelectorAll '.piano-key'
    for key-el in keys
      key-el.addEventListener 'mousedown', (e) ~> @on-mouse-down.apply @, [e]
      key-el.addEventListener 'touchstart', (e) ~> @on-touch-start.apply @, [e]

    # 釋放按鍵 (全域)
    document.addEventListener 'mouseup', (e) ~> @release-all-keys!
    document.addEventListener 'touchend', (e) ~> @release-all-keys!

  # 鍵盤按下
  on-keydown: (e) ~>
    return if e.repeat  # 忽略長按重複觸發
    key = e.key.toUpperCase!
    note = @key-map[key]
    return unless note
    @press-key note

  # 鍵盤放開
  on-keyup: (e) ~>
    key = e.key.toUpperCase!
    note = @key-map[key]
    return unless note
    @release-key note

  # 滑鼠按下
  on-mouse-down: (e) ~>
    e.preventDefault!
    note = e.currentTarget.dataset.note
    @press-key note

  # 觸控開始
  on-touch-start: (e) ~>
    e.preventDefault!
    note = e.currentTarget.dataset.note
    @press-key note

  # 按下琴鍵
  press-key: (note) ->
    return if @active-keys[note]  # 避免重複按下
    @active-keys[note] = true

    # 視覺回饋
    key-el = @root.querySelector "[data-note='#{note}']"
    key-el?.classList.add 'active' if key-el

    # 播放聲音
    @sound-engine.play note, 0.3

    # 觸發回調
    @on-key-press note

  # 釋放琴鍵
  release-key: (note) ->
    return unless @active-keys[note]
    delete @active-keys[note]

    # 移除視覺回饋
    key-el = @root.querySelector "[data-note='#{note}']"
    key-el?.classList.remove 'active' if key-el

  # 釋放所有琴鍵
  release-all-keys: ->
    for note of @active-keys
      @release-key note

# 跨環境匯出
if window?
  window.Piano = piano
else
  module.exports = piano
