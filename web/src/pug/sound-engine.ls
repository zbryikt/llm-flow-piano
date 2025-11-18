# SoundEngine - 音訊引擎
# 負責生成鋼琴音符聲音，支援合成音與預載音檔

sound-engine = (options = {}) ->
  @ <<<
    type: options.type or 'synth'  # 'synth' or 'sample'
    audio-ctx: null
    samples: {}  # 預留給音檔使用

  # 延遲初始化 AudioContext (避免 autoplay policy 問題)
  @_init-audio-ctx! if options.auto-init
  @

sound-engine.prototype = Object.create(Object.prototype) <<<
  constructor: sound-engine

  # 初始化 AudioContext
  _init-audio-ctx: ->
    return if @audio-ctx
    @audio-ctx = new (window.AudioContext or window.webkitAudioContext)!

  # 音符名稱轉頻率 (A4 = 440Hz 為基準)
  # 使用十二平均律: f(n) = 440 × 2^((n-49)/12)
  note-to-freq: (note) ->
    note-map =
      'C4': -9, 'C#4': -8, 'D4': -7, 'D#4': -6
      'E4': -5, 'F4': -4, 'F#4': -3, 'G4': -2
      'G#4': -1, 'A4': 0, 'A#4': 1, 'B4': 2, 'C5': 3

    semitones = note-map[note]
    return 440 if not semitones?
    440 * Math.pow(2, semitones / 12)

  # Web Audio API 合成音
  play-synth: (frequency, duration = 0.3) ->
    @_init-audio-ctx!

    # 建立 oscillator
    osc = @audio-ctx.createOscillator!
    osc.type = 'sine'  # 正弦波，較柔和
    osc.frequency.value = frequency

    # 建立 gain node 做 ADSR envelope (簡化版)
    gain = @audio-ctx.createGain!
    gain.gain.value = 0

    # 連接節點
    osc.connect gain
    gain.connect @audio-ctx.destination

    # 設定音量包絡
    now = @audio-ctx.currentTime
    gain.gain.setValueAtTime 0, now
    gain.gain.linearRampToValueAtTime 0.3, now + 0.01  # Attack
    gain.gain.linearRampToValueAtTime 0.2, now + 0.05  # Decay
    gain.gain.setValueAtTime 0.2, now + duration - 0.05  # Sustain
    gain.gain.linearRampToValueAtTime 0, now + duration  # Release

    # 播放
    osc.start now
    osc.stop now + duration

  # 播放音檔 (預留介面)
  play-sample: (note, duration = 0.3) ->
    return unless @samples[note]
    @samples[note].currentTime = 0
    @samples[note].play!

  # 統一播放入口
  play: (note, duration = 0.3) ->
    freq = @note-to-freq note
    if @type is 'synth'
      @play-synth freq, duration
    else
      @play-sample note, duration

  # 載入音檔 (未來擴充用)
  load-sample: (note, url) ->
    audio = new Audio url
    @samples[note] = audio

# 跨環境匯出
if window?
  window.SoundEngine = sound-engine
else
  module.exports = sound-engine
