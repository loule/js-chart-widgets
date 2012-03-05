<pre>
npm install
cake build

#--> lib/js-chart-widgets.min.js
</pre>

## Calendar

    new Calendar({
      append_to: 'some_id',
      num_weeks: 51,
      day_size: 11,
      data: [
        ['2012-03-01', 123],
        ['2012-03-02', 456.7],
        // gaps are fine
        ['2012-03-04', 234]
      ]
    });

![](https://github.com/jfdi/js-chart-widgets/raw/master/doc/calendar.png)

## The Means

- Wrap or borrow from other open-source widgets when it makes sense
- Get our NIH on when it doesn't

## The End

- Make a sensible abstraction with nice defaults for each of the world's widget types

![](http://imgs.xkcd.com/comics/standards.png)
