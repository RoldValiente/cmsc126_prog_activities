//This function starts the entire operation. All other functions of the program are called by this function.
//This is where the inputs are received and verified for validity and execution of certain processes.
//This is also responsible in printing the result on the website.
function main()
{
    var income = Number(document.getElementById("salary").value);
    var worker_type = document.getElementById("worker_type").value;
    var dependents = Number(document.getElementById("dependents").value);
    

    if ((income < 0 || isNaN(income)==true) || (dependents < 0 || isNaN(dependents) == true || dependents%1 !=0) || isNaN(worker_type) == false)
    {
        alert("You entered a wrong input! \nMonthly income must be a nonnegative number.\nNumber of dependents must be a nonnegative, whole number.")
        return;
    }

    if (worker_type == "Yes")
    {
        var y = deductions_government(income, dependents);
        var gross_income = income*12 + income;
        var net_income = gross_income - y;
        var income_tax_payable = payable_tax(net_income);
    }
    else if (worker_type == "No")
    {
        var z = deductions_private(income, dependents);
        var gross_income = (income*12)+income;
        var net_income = gross_income - z;
        var income_tax_payable = payable_tax(net_income);
    }
    else
    {
        alert("You entered a wrong response for the question \"Are you a Government Worker?\"")
        return;
    }
    
    var print = (income_tax_payable).toLocaleString("en-GB", {style: "currency", currency: "Php", minimumFractionDigits: 2}) + " / year";
    document.getElementById("result").innerHTML = print;
}

//This function computes the total deductions of the user who is a government worker.
function deductions_government(x, d)
{
    var gsis = (x*0.09)*12;
    var pag_ibig = (x*0.01375)*12;
    var philhealth = (x*0.035)*12;
    var personal_exemp = TPE(d);
    return gsis + pag_ibig + philhealth + personal_exemp;
}

//This function computes the total deductions of the user who is a private worker.
function deductions_private(x, d)
{
    var sss = (x*0.11)*12;
    var pag_ibig = (x*0.01375)*12;
    var philhealth = (x*0.035)*12;
    var personal_exemp = TPE(d);
    return sss + pag_ibig + philhealth + personal_exemp;
}

//This computes the personal exemption and the additional personal exemptions of the user.
function TPE(a) //TPE means Total Personal Exemption (Personal Exemption plus the Additional Exemptions from Dependencies)
{
    if (a >= 0 && a <= 4)
    {
        return b = (a+1)*50000;
    }
    else if (a > 4)
    {
        return b = 250000;
    }
}

//This function evaluates the payable income tax of the user based on his/her net taxable income.
function payable_tax(t)
{
    if (t <= 250000)
    {
        return 0;
    }
    else if (t > 250000 && t <= 400000)
    {
        return (t-250000)*0.20;
    }
    else if (t > 400000 && t <= 800000)
    {
        return 30000+((t-400000)*0.25);
    }
    else if (t > 800000 && t <= 2000000)
    {
        return 130000+((t-800000)*0.30);
    }
    else if (t > 2000000 && t <= 8000000)
    {
        return 490000+((t-2000000)*0.32);
    }
    else if (t > 8000000)
    {
        return 2410000+((t-8000000)*0.35)
    }

}