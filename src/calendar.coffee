
make_colorizer = (c1, c2, v1, v2) ->
  (v) ->
    interpolateColors c1, c2, (if v1 == v2 then 0.5 else ((v - v1) / (v2 - v1)))


rjust_2_0 = (s) ->
  if s.length == 1
    "0#{s}"
  else
    s

strftime_Ymd = (date) ->
  Y = 1900 + date.getYear()
  m = rjust_2_0("" + (date.getMonth() + 1))
  d = rjust_2_0("" + date.getDate())
  "#{Y}-#{m}-#{d}"


class Calendar extends Element
  constructor: ({color, data, day_size, num_weeks, append_to}) ->
    super 'div', 'Calendar'
    if append_to
      document.getElementById(append_to).appendChild @_
    max_value = 0
    for [k, v] in data
      if v > max_value
        max_value = v
    colorizer = make_colorizer '#FFFFFF', color, 0, max_value
    w = (day_size * num_weeks) + (1 * (num_weeks + 1))
    h = (day_size * 7) + (1 * (7 + 1))
    dayHolder = D()
    dayHolder.setStyles {
      width: w + 'px'
      height: h + 'px'
      position: 'relative'
      background: '#999999'
    }
    @appendChild dayHolder
    
    datestr_coord_map = {}
    MS_IN_DAY = 1000 * 3600 * 24
    t = new Date()
    day = t.getDay()          #  [Sun..Sat] <-> [0..6]
    day = (7 + day - 1) % 7   #  [Mon..Sun] <-> [0..6]
    days_until_next_sunday = 6 - day
    t = new Date(t.getTime() + (MS_IN_DAY * days_until_next_sunday))
    for x in [(num_weeks - 1)..0]
      for y in [(7 - 1)..0]
        datestr_coord_map[strftime_Ymd(t)] = "#{x}:#{y}"
        t = new Date(t.getTime() - MS_IN_DAY)
    
    days = {}
    for x in [0...num_weeks]
      for y in [0...7]
        day = D()
        day.setStyles {
          width: day_size + 'px'
          height: day_size + 'px'
          background: '#FFFFFF'
          position: 'absolute'
          left: (1 + (day_size + 1) * x) + 'px'
          top:  (1 + (day_size + 1) * y) + 'px'
          zIndex: 2
        }
        days["#{x}:#{y}"] = day
        dayHolder.appendChild day
    for [datestr, v] in data
      coord = datestr_coord_map[datestr]
      if coord
        days[coord].setStyles background: colorizer(v)

