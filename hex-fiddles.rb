hex_numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']

def converter(hex)
  hex_array = hex.to_s.split('').reverse
  dec_array = []
  dec = 0
  hex_array.each_with_index do |digit, index|
    dec_array.push(digit.to_i * (16 ** index))
  end
  dec_array.each do |number|
    dec = dec + number.to_i
  end
  return dec
end

puts 'enter your hex number'
hex_input = gets.chomp
puts 'this is the decimal value: '
puts converter(hex_input)
