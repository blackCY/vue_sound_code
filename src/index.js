// @flow

function foo(x: ?number): string {
  if (x) {
    return x
  }
  return 'default string'
}

var arr: Array<number> = [1, 2, 3]
arr.push('123')
