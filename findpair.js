function uniquePairFind(n,array)
{
   let pairCount = 0;
   for(let li=0;li<n;li++)  //here we set loop for n length
      {
         if(array[li] == array[li+1])   //here we check and setisfied condition and inside be catch count of pair
            {
               li++;
               pairCount++;
            };
      };
      return pairCount;   //here return the total pairs count
};
var array = [1,1,1,1,2,3,3,3,3,3,3,3,4,4,4,4,4]; //this is array of color
var n = array.length;
console.log("Pair : " + uniquePairFind(n,array));   //display output